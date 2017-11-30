package com.mengka.springboot.https_iotapp_08;

import com.alibaba.fastjson.JSON;
import lombok.extern.log4j.Log4j2;
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
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
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

import javax.net.ssl.*;
import java.io.*;
import java.net.UnknownHostException;
import java.security.*;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author huangyy
 * @date 2017/11/11.
 */
@Log4j2
public class HttpsClientUtil {

    private static final int defaultTimeout = 10 * 1000;

    private static final int maxTotal = 200;// 将最大连接数增加
    private static final int maxPerRoute = 40;// 将每个路由基础的连接增加
    private static final int maxRoute = 100; // 将目标主机的最大连接数增加

    /**
     * keystore用于存放自己的密钥和公钥
     */
    public static final String clientKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/mykey.keystore";
    public static final String clientKeyStorePwd = "123456";

    /**
     * truststore用于存放所有需要信任方的公钥
     */
    public static final String clientTrustKeyStoreFile = "/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/mykeytrust.keystore";
    public static final String clientTrustKeyStorePwd = "654321";


    private static CloseableHttpClient httpClient = null;

    private final static Object syncLock = new Object();

    private static void config(HttpRequestBase httpRequestBase, Map<String, String> headerMap) {
        //配置请求的超时设置
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectionRequestTimeout(defaultTimeout)
                .setConnectTimeout(defaultTimeout)
                .setSocketTimeout(defaultTimeout)
                .build();
        httpRequestBase.setConfig(requestConfig);
        //请求头信息
        if (headerMap != null) {
            for (String key : headerMap.keySet()) {
                httpRequestBase.addHeader(key, headerMap.get(key));
            }
        }
    }

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
     * 获取HttpClient
     *
     * @param maxTotal    最大连接数
     * @param maxPerRoute 每个路由基础的连接数
     * @param maxRoute    目标主机的最大连接数
     * @param hostname
     * @param port
     * @return
     */
    public static CloseableHttpClient createHttpClient(int maxTotal,
                                                       int maxPerRoute, int maxRoute, String hostname, int port) {
        ConnectionSocketFactory plainsf = PlainConnectionSocketFactory
                .getSocketFactory();
        SSLContext sslContext = getSSLContext();
        SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext,
                NoopHostnameVerifier.INSTANCE);

        Registry<ConnectionSocketFactory> registry = RegistryBuilder
                .<ConnectionSocketFactory>create()
                .register("http", plainsf)
                .register("https", sslsf)
                .build();
        HttpHost httpHost = new HttpHost(hostname, port);

        // http连接管理
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(registry);
        cm.setMaxTotal(maxTotal);//将最大连接数增加
        cm.setDefaultMaxPerRoute(maxPerRoute);//将每个路由基础的连接增加
        cm.setMaxPerRoute(new HttpRoute(httpHost), maxRoute);//将目标主机的最大连接数增加

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

    private static void setPostParams(HttpPost httpost,
                                      Map<String, Object> params) {
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        Set<String> keySet = params.keySet();
        for (String key : keySet) {
            nvps.add(new BasicNameValuePair(key, params.get(key).toString()));
        }

        String content = JSON.toJSONString(params);
        httpost.setEntity(new StringEntity(content,
                ContentType.APPLICATION_JSON));
    }

    public static String setGetParams(String url, Map<String, Object> params) {
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

    public static String post(String url, Map<String, Object> params) throws IOException {
        return post(url, null, params);
    }

    public static String post(String url, Map<String, String> headerMap, Map<String, Object> params) throws IOException {
        HttpPost httppost = new HttpPost(url);
        config(httppost, headerMap);

        setPostParams(httppost, params);
        CloseableHttpResponse response = null;
        try {
            response = getHttpClient(url).execute(httppost,
                    HttpClientContext.create());
            HttpEntity entity = response.getEntity();
            String result = EntityUtils.toString(entity, "utf-8");
            EntityUtils.consume(entity);
            return result;
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                if (response != null)
                    response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static String get(String url, Map<String, Object> params) {
        return get(url, null, params);
    }

    public static String get(String url, Map<String, String> headerMap, Map<String, Object> params) {
        url = setGetParams(url, params);
        return getHeader(url, headerMap);
    }

    private static String getHeader(String url, Map<String, String> headerMap) {
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

    public static String get(String url) {
        return getHeader(url, null);
    }

    public static SSLContext getSSLContext() {
        char[] keyPassphrase = clientKeyStorePwd.toCharArray();
        char[] trustPassphrase = clientTrustKeyStorePwd.toCharArray();
        SSLContext c = null;
        try {
            //通过PKCS12的证书格式得到密钥对象
            KeyStore ks = KeyStore.getInstance("JKS");

            //keycert.p12包含客户端的证书和key
            ks.load(new FileInputStream(clientKeyStoreFile), keyPassphrase);
            KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
            kmf.init(ks, keyPassphrase);
            KeyStore tks = KeyStore.getInstance("JKS");
            //用CA为服务器提供证书，若想连接服务器则将他添加到密钥库中
            tks.load(new FileInputStream(clientTrustKeyStoreFile), trustPassphrase);
            TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
            tmf.init(tks);
            c = SSLContext.getInstance("TLSv1.2");
            c.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);//如果信任证书设置为null 则从jdk证书库去取
        } catch (KeyStoreException e) {
            e.printStackTrace();
            log.error(e.toString());
        } catch (CertificateException e) {
            e.printStackTrace();
            log.error(e.toString());
        } catch (UnrecoverableKeyException e) {
            e.printStackTrace();
            log.error(e.toString());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            log.error(e.toString());
        } catch (IOException e) {
            e.printStackTrace();
            log.error(e.toString());
        } catch (KeyManagementException e) {
            e.printStackTrace();
            log.error(e.toString());
        }
        return c;
    }
}
