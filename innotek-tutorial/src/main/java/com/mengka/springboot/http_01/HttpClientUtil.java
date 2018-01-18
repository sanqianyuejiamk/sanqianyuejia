package com.mengka.springboot.http_01;

import com.alibaba.fastjson.JSON;
import org.apache.commons.lang.StringUtils;
import org.apache.http.*;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.LayeredConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.CharArrayBuffer;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLException;
import javax.net.ssl.SSLHandshakeException;
import java.io.*;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author huangyy
 * @date 2018/01/18.
 */
public class HttpClientUtil {

    private static final int timeOut = 10 * 1000;

    private static final int maxTotal = 200;// 将最大连接数增加
    private static final int maxPerRoute = 40;// 将每个路由基础的连接增加
    private static final int maxRoute = 100; // 将目标主机的最大连接数增加

    private static CloseableHttpClient httpClient = null;

    private final static Object syncLock = new Object();

    private static final String DEFAULT_ENCODING = "utf-8";

    private static void config(HttpRequestBase httpRequestBase, Map<String, String> headerMap) {
        // 配置请求的超时设置
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectionRequestTimeout(timeOut)
                .setConnectTimeout(timeOut)
                .setSocketTimeout(timeOut)
                .build();
        httpRequestBase.setConfig(requestConfig);
        //请求头信息
        if (headerMap != null) {
            for (String key : headerMap.keySet()) {
                httpRequestBase.addHeader(key, headerMap.get(key));
            }
        }
    }

    /**
     * 获取HttpClient对象
     *
     * @return
     */
    public static CloseableHttpClient getHttpClient(String url) {
        String hostname = url.split("/")[2];
        int port = 80;
        if (hostname.contains(":")) {
            String[] arr = hostname.split(":");
            hostname = arr[0];
            port = Integer.parseInt(arr[1]);
        }
        if (httpClient == null) {
            synchronized (syncLock) {
                if (httpClient == null) {
                    httpClient = createHttpClient(maxTotal, maxPerRoute, maxRoute, hostname, port);
                }
            }
        }
        return httpClient;
    }

    /**
     * 创建HttpClient对象
     *
     * @return
     */
    public static CloseableHttpClient createHttpClient(int maxTotal,
                                                       int maxPerRoute, int maxRoute, String hostname, int port) {
        ConnectionSocketFactory plainsf = PlainConnectionSocketFactory
                .getSocketFactory();
        LayeredConnectionSocketFactory sslsf = SSLConnectionSocketFactory
                .getSocketFactory();
        Registry<ConnectionSocketFactory> registry = RegistryBuilder
                .<ConnectionSocketFactory>create().register("http", plainsf)
                .register("https", sslsf).build();
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(
                registry);
        // 将最大连接数增加
        cm.setMaxTotal(maxTotal);
        // 将每个路由基础的连接增加
        cm.setDefaultMaxPerRoute(maxPerRoute);
        HttpHost httpHost = new HttpHost(hostname, port);
        // 将目标主机的最大连接数增加
        cm.setMaxPerRoute(new HttpRoute(httpHost), maxRoute);

        // 请求重试处理
        HttpRequestRetryHandler httpRequestRetryHandler = new HttpRequestRetryHandler() {
            public boolean retryRequest(IOException exception,
                                        int executionCount, HttpContext context) {
                if (executionCount >= 5) {// 如果已经重试了5次，就放弃
                    return false;
                }
                if (exception instanceof NoHttpResponseException) {// 如果服务器丢掉了连接，那么就重试
                    return true;
                }
                if (exception instanceof SSLHandshakeException) {// 不要重试SSL握手异常
                    return false;
                }
                if (exception instanceof InterruptedIOException) {// 超时
                    return false;
                }
                if (exception instanceof UnknownHostException) {// 目标服务器不可达
                    return false;
                }
                if (exception instanceof ConnectTimeoutException) {// 连接被拒绝
                    return false;
                }
                if (exception instanceof SSLException) {// SSL握手异常
                    return false;
                }

                HttpClientContext clientContext = HttpClientContext
                        .adapt(context);
                HttpRequest request = clientContext.getRequest();
                // 如果请求是幂等的，就再次尝试
                if (!(request instanceof HttpEntityEnclosingRequest)) {
                    return true;
                }
                return false;
            }
        };

        CloseableHttpClient httpClient = HttpClients.custom()
                .setConnectionManager(cm)
                .setRetryHandler(httpRequestRetryHandler).build();

        return httpClient;
    }

    private static void setPostParams(HttpPost httpost, Map<String, Object> params) {
        if(params == null){
            return;
        }
        String content = JSON.toJSONString(params);
        httpost.setEntity(new StringEntity(content, ContentType.APPLICATION_JSON));
    }

    private static String setGetParams(String url, Map<String, Object> params) {
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        Set<String> keySet = params.keySet();
        for (String key : keySet) {
            nvps.add(new BasicNameValuePair(key, params.get(key).toString()));
        }
        try {
            UrlEncodedFormEntity encodedFormEntity = new UrlEncodedFormEntity(nvps, "UTF-8");
            String queryString = getContent(encodedFormEntity, "UTF-8");
            if (StringUtils.isNotBlank(queryString)) {
                url = url + "?" + queryString;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return url;
    }

    public static String getContent(HttpEntity entity, String charset) throws Exception {
        int i = (int) entity.getContentLength();
        if (i < 0) {
            i = 4096;
        }
        final Reader reader = new InputStreamReader(entity.getContent(), charset);
        final CharArrayBuffer buffer = new CharArrayBuffer(i);
        final char[] tmp = new char[1024];
        int l;
        while ((l = reader.read(tmp)) != -1) {
            buffer.append(tmp, 0, l);
        }
        return buffer.toString();
    }

    /**
     * GET请求URL获取内容
     *
     * @param url
     * @return
     * @throws IOException
     */
    public static CloseableHttpResponse post(String url, Map<String, String> headerMap, Map<String, Object> params) throws IOException {
        HttpPost httppost = new HttpPost(url);
        config(httppost, headerMap);

        setPostParams(httppost, params);
        CloseableHttpResponse response = null;
        try {
            response = getHttpClient(url).execute(httppost,
                    HttpClientContext.create());
            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    public static String getHttpResponseBody(HttpResponse response)
            throws UnsupportedOperationException, IOException {
        if (response == null) {
            return null;
        }
        String body = null;
        HttpEntity entity = response.getEntity();
        if (entity != null && entity.isStreaming()) {
            String encoding = entity.getContentEncoding() != null ? entity.getContentEncoding().getValue() : null;
            body = inputStream2String(entity.getContent(), encoding);
        }
        return body;
    }

    public static String get(String url, Map<String, String> headerMap, Map<String, Object> params) {
        url = setGetParams(url, params);
        return get(url, headerMap);
    }

    /**
     * GET请求URL获取内容
     *
     * @param url
     * @return
     */
    public static String get(String url, Map<String, String> headerMap) {
        HttpGet httpget = new HttpGet(url);
        config(httpget, headerMap);
        CloseableHttpResponse response = null;
        try {
            response = getHttpClient(url).execute(httpget,
                    HttpClientContext.create());
            HttpEntity entity = response.getEntity();
            String result = EntityUtils.toString(entity, "utf-8");
            EntityUtils.consume(entity);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (response != null)
                    response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    private static String inputStream2String(InputStream in, String charsetName) {
        if (in == null) {
            return null;
        }

        InputStreamReader inReader = null;

        try {
            if (StringUtils.isBlank(charsetName)) {
                inReader = new InputStreamReader(in, DEFAULT_ENCODING);
            } else {
                inReader = new InputStreamReader(in, charsetName);
            }

            int readLen = 0;
            char[] buffer = new char[1024];
            StringBuffer strBuf = new StringBuffer();
            while ((readLen = inReader.read(buffer)) != -1) {
                strBuf.append(buffer, 0, readLen);
            }

            return strBuf.toString();
        } catch (IOException e) {
            System.out.println(e);
        } finally {
            closeStream(inReader);
        }

        return null;
    }

    private static void closeStream(Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (IOException e) {
                System.out.println(e);
            }
        }
    }
}
