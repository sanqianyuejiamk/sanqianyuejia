package com.mengka.springboot.https_iotapp_06;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.net.ssl.*;
import java.io.*;
import java.net.URL;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 华为IOT平台https工具
 */
public class HttpsClientUtil {

    private final static Logger LOGGER = LogManager.getLogger(HttpsClientUtil.class);

    private final static String charset = "utf-8";

    /**
     * keystore用于存放自己的密钥和公钥
     */
    public static final String clientKeyStoreFile = "/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/cabbage_client/cabbage.keystore";
    public static final String clientKeyStorePwd = "123456";

    /**
     * truststore用于存放所有需要信任方的公钥
     */
    public static final String clientTrustKeyStoreFile = "/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/cabbage_client/cabbagetrust.keystore";
    public static final String clientTrustKeyStorePwd = "123456";




    private static X509TrustManager xtm = new X509TrustManager() {
        @Override
        public X509Certificate[] getAcceptedIssuers() {
            // TODO Auto-generated method stub
            X509Certificate[] a = null;
            return a;
        }

        @Override
        public void checkServerTrusted(X509Certificate[] arg0, String arg1)
                throws CertificateException {
            // TODO Auto-generated method stub

        }

        @Override
        public void checkClientTrusted(X509Certificate[] arg0, String arg1)
                throws CertificateException {
            // TODO Auto-generated method stub

        }
    };

    private static HostnameVerifier hv = new HostnameVerifier() {
        @Override
        public boolean verify(String arg0, SSLSession arg1) {
            return true;
        }
    };

    /**
     *  POST请求服务器(https协议)
     *
     * @param url
     * @param param
     * @return
     */
    public static String post(String url, Map<String, Object> param) {
        return execute(url,param,null, RequestMethod.POST);
    }

    /**
     *  GET请求服务器(https协议)
     *
     * @param url
     * @param param
     * @return
     */
    public static String get(String url, Map<String, Object> param) {
        return execute(url,param,null, RequestMethod.GET);
    }

    /**
     *  PUT请求服务器(https协议)
     *
     * @param url
     * @param param
     * @return
     */
    public static String put(String url, Map<String, Object> param) {
        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Content-Type", "application/json");
        return execute(url,param,headerMap, RequestMethod.PUT);
    }

    /**
     * POST请求服务器(https协议)
     *
     * @param url
     * @param param
     * @param headerMap
     * @return
     */
    public String post(String url, Map<String, Object> param, Map<String, String> headerMap) {
        return execute(url,param,headerMap, RequestMethod.POST);
    }

    /**
     *  GET请求服务器(https协议)
     *
     * @param url
     * @param param
     * @param headerMap
     * @return
     */
    public String get(String url, Map<String, Object> param, Map<String, String> headerMap) {
        return execute(url,param,headerMap, RequestMethod.GET);
    }

    /**
     *  PUT请求服务器(https协议)
     *
     * @param url
     * @param param
     * @param headerMap
     * @return
     */
    public String put(String url, Map<String, Object> param, Map<String, String> headerMap) {
        return execute(url,param,headerMap, RequestMethod.PUT);
    }

    /**
     * post方式请求服务器(https协议)
     *
     * @param url       请求地址
     * @param param     参数
     * @param headerMap 请求头
     * @param reqMethod 请求类型
     * @return
     */
    public static String execute(String url, Map<String, Object> param, Map<String, String> headerMap, RequestMethod reqMethod) {
        JSONObject obj = new JSONObject();
        for (String key : param.keySet()) {
            obj.put(key, param.get(key));
        }
        String content = obj.toString();
        //post请求
        return execute(url, content, headerMap, reqMethod);
    }

    /**
     * post方式请求服务器(https协议)
     *
     * @param url       请求地址
     * @param content   参数
     * @param headerMap 请求头
     * @param reqMethod 请求类型
     * @return
     */
    public static String execute(String url, String content, Map<String, String> headerMap, RequestMethod reqMethod) {
        InputStreamReader insr = null;
        HttpsURLConnection httpsConn = null;
        try {
            // 创建SSLContext对象，并使用我们指定的信任管理器初始化
            SSLContext sslContext = getSSLContext();

            // 从上述SSLContext对象中得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            // 创建URL对象
            URL myURL = new URL(url);
            // 创建HttpsURLConnection对象，并设置其SSLSocketFactory对象
            httpsConn = (HttpsURLConnection) myURL.openConnection();
            httpsConn.setRequestProperty("Charset", charset);

            if(headerMap!=null) {
                for (String headerName : headerMap.keySet()) {
                    httpsConn.setRequestProperty(headerName, headerMap.get(headerName));
                }
            }
            httpsConn.setSSLSocketFactory(ssf);
            httpsConn.setHostnameVerifier(hv);
            httpsConn.setRequestMethod(reqMethod.name());
            httpsConn.setDoOutput(true);
            httpsConn.setDoInput(true);
            //POST请求
            DataOutputStream out = new DataOutputStream(httpsConn.getOutputStream());
            out.write(content.getBytes());
            out.flush();
            out.close();

            if (httpsConn != null) {
                // 取得该连接的输入流，以读取响应内容
                insr = new InputStreamReader(httpsConn.getInputStream());
                // 读取服务器的响应内容并显示
                //读取响应
                BufferedReader reader = new BufferedReader(insr);
                StringBuffer sb = new StringBuffer("");
                String lines = "";
                while ((lines = reader.readLine()) != null) {
                    lines = new String(lines.getBytes(), charset);
                    sb.append(lines);
                }
                return sb.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } finally {
            if (insr != null) {
                try {
                    LOGGER.debug(">>>>>>>>>>>>>>>>>>>>流关闭!");
                    insr.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    LOGGER.error(e.toString());
                }
            }
            if (httpsConn != null) {
                LOGGER.debug(">>>>>>>>>>>>>>>>>>连接关闭!");
                httpsConn.disconnect();
            }
        }
        return "";
    }

    /**
     * 使用我们的密钥存储密钥管理器和信任管理器
     *
     * @return
     */
    public static SSLContext getSSLContext() {
        String keyPass = clientKeyStorePwd;
        String trustPass = clientTrustKeyStorePwd;
        String keyStorePath = clientKeyStoreFile;
        String trustStorePath = clientTrustKeyStoreFile;

        char[] keyPassphrase = keyPass.toCharArray();
        char[] trustPassphrase = trustPass.toCharArray();
        SSLContext c = null;
        try {
            //通过PKCS12的证书格式得到密钥对象
            //TODO:xxx
//            KeyStore ks = KeyStore.getInstance("PKCS12");//交换数字证书的标准

            KeyStore ks = KeyStore.getInstance("JKS");

            //keycert.p12包含客户端的证书和key
            ks.load(new FileInputStream(keyStorePath), keyPassphrase);
            KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
            kmf.init(ks, keyPassphrase);
            KeyStore tks = KeyStore.getInstance("JKS");
            //用CA为服务器提供证书，若想连接服务器则将他添加到密钥库中
            tks.load(new FileInputStream(trustStorePath), trustPassphrase);
            TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
            tmf.init(tks);
            c = SSLContext.getInstance("TLSv1.2");//TODO
            c.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);//如果信任证书设置为null 则从jdk证书库去取
        } catch (KeyStoreException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (CertificateException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (UnrecoverableKeyException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (KeyManagementException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        }
        return c;
    }

    /**
     * HttpClient连接SSL
     */
    public String ssl(String url, Map<String, Object> param, Integer type) {
        String trustPass = clientTrustKeyStorePwd;
        String trustStorePath = clientTrustKeyStoreFile;

        CloseableHttpClient httpclient = null;
        String result = "";
        try {
            KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
            FileInputStream instream = new FileInputStream(trustStorePath);
            try {
                // 加载keyStore
                trustStore.load(instream, trustPass.toCharArray());
            } catch (CertificateException e) {
                e.printStackTrace();
                LOGGER.error("trustStore load异常信息" + e.toString());
            } finally {
                try {
                    instream.close();
                } catch (Exception ignore) {
                    System.out.println(ignore.toString());
                }
            }
            // 相信自己的CA和所有自签名的证书
            SSLContext sslcontext = SSLContexts.custom().loadTrustMaterial(trustStore, new TrustSelfSignedStrategy()).build();
            // 只允许使用TLSv1协议
            SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext, new String[]{"TLSv1"}, null,
                    SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
            httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
            // 创建http请求(get方式)
            HttpPost httpPost = new HttpPost(url);
            // 创建参数队列
            List<NameValuePair> formparams = new ArrayList<NameValuePair>();
            for (String key : param.keySet()) {
                formparams.add(new BasicNameValuePair(key, param.get(key).toString()));
            }

            UrlEncodedFormEntity uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
            httpPost.setEntity(uefEntity);
            httpPost.setHeader("Content-Type", "application/x-www-form-urlencoded");

            System.out.println("executing request" + httpPost.getRequestLine());
            CloseableHttpResponse response = httpclient.execute(httpPost);
            try {
                HttpEntity entity = response.getEntity();
                System.out.println("----------------------------------------");
                System.out.println(response.getStatusLine());
                if (entity != null) {
                    System.out.println("Response content length: " + entity.getContentLength());
                    System.out.println(EntityUtils.toString(entity));
                    EntityUtils.consume(entity);
                    result = EntityUtils.toString(entity);
                }
            } finally {
                response.close();
            }
        } catch (ParseException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (KeyManagementException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (KeyStoreException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } finally {
            if (httpclient != null) {
                try {
                    httpclient.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    System.out.println(e.toString());
                }
            }
        }
        return result;
    }

}
