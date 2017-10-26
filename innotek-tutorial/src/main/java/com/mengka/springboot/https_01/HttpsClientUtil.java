package com.mengka.springboot.https_01;


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
import org.springframework.core.io.ClassPathResource;

import javax.net.ssl.*;
import java.io.*;
import java.net.URL;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.*;
import java.util.Map.Entry;

public class HttpsClientUtil {
    private final static String charset = "utf-8";
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
     * post��ʽ���������(httpsЭ��)
     *
     * @param url   �����ַ
     * @param param ����
     * @param type  ����
     * @return
     * @throws NoSuchAlgorithmException
     * @throws KeyManagementException
     * @throws IOException
     */
    public static String doPost(String url, Map<String, Object> param, Integer type) {
        InputStreamReader insr = null;
        HttpsURLConnection httpsConn = null;
        try {
            String content = "";
            if (type == 0) {
                content = param.get("param_str").toString();
            } else {
                JSONObject obj = new JSONObject();
                for (String key : param.keySet()) {
                    obj.put(key, param.get(key));
                }
                content = obj.toString();
            }
            System.out.println("url-->>" + url + ";������" + content);
            // ����SSLContext���󣬲�ʹ������ָ�������ι�������ʼ��
//	        TrustManager[] tm = { xtm};
//        	System.setProperty("https.protocols", "TLSv1");
//        	SSLContext sslContext = SSLContext.getInstance("TLSv1");
//	        sslContext.init(null, tm, null);
            SSLContext sslContext = getSSLContext();

            // ������SSLContext�����еõ�SSLSocketFactory����
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            // ����URL����
            URL myURL = new URL(url);
            // ����HttpsURLConnection���󣬲�������SSLSocketFactory����
            httpsConn = (HttpsURLConnection) myURL.openConnection();
            httpsConn.setRequestProperty("Charset", charset);
            if (Constant.API_TYPE_TOKEN == type) {
                httpsConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            } else {
                if (Constant.API_REFRESH_TOKEN != type) {
                    //ˢ��token�ӿڲ���Ҫ��header����
                    httpsConn.setRequestProperty("app_key", Constant.appid);
                    httpsConn.setRequestProperty("Authorization", Constant.TOKEN_TYPE + " " + Constant.ACCESS_TOKEN);
                }
                httpsConn.setRequestProperty("Content-Type", "application/json");
            }
            httpsConn.setSSLSocketFactory(ssf);
            httpsConn.setHostnameVerifier(hv);
            if (Constant.API_DEVICE_CONFIG == type) {
                httpsConn.setRequestMethod("PUT");
            } else {
                httpsConn.setRequestMethod("POST");
            }

            httpsConn.setDoOutput(true);
            httpsConn.setDoInput(true);
            //POST����
            DataOutputStream out = new DataOutputStream(
                    httpsConn.getOutputStream());
            out.write(content.getBytes());
            out.flush();
            out.close();

            //��ȡ��Ӧͷ��Ϣ
            Map<String, List<String>> headerFields = httpsConn.getHeaderFields();
            Set<Entry<String, List<String>>> entrySet = headerFields.entrySet();
            Iterator<Entry<String, List<String>>> iterator = entrySet.iterator();
            while (iterator.hasNext()) {
                Entry<String, List<String>> next = iterator.next();
                String key = next.getKey();
                List<String> value = next.getValue();
                System.out.println(key + ":" + value.toString());
            }
            if (httpsConn != null) {
                // ȡ�ø����ӵ����������Զ�ȡ��Ӧ����
                insr = new InputStreamReader(httpsConn.getInputStream());
                // ��ȡ����������Ӧ���ݲ���ʾ
                //��ȡ��Ӧ
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
                    System.out.println(">>>>>>>>>>>>>>>>>>>>���ر�!");
                    insr.close();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                    System.out.println(e.toString());
                }
            }
            if (httpsConn != null) {
                System.out.println(">>>>>>>>>>>>>>>>>>���ӹر�!");
                httpsConn.disconnect();
            }
        }
        return "";
    }

    /**
     * ʹ�����ǵ���Կ�洢��Կ�����������ι�����
     *
     * @return
     */
    public static SSLContext getSSLContext() {
        char[] keyPassphrase = "innotek".toCharArray();
        char[] trustPassphrase = "changeit".toCharArray();
        SSLContext c = null;
        try {
            //ͨ��PKCS12��֤���ʽ�õ���Կ����
            KeyStore ks = KeyStore.getInstance("PKCS12");//��������֤��ı�׼
            //keycert.p12�����ͻ��˵�֤���key
            ClassPathResource res = new ClassPathResource("iotCert.pkcs12");
            ks.load(new FileInputStream(res.getFile()), keyPassphrase);
            KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
            kmf.init(ks, keyPassphrase);
            KeyStore tks = KeyStore.getInstance("JKS");
            //��CAΪ�������ṩ֤�飬�������ӷ�����������ӵ���Կ����
            ClassPathResource res2 = new ClassPathResource("truststore.ks");
            tks.load(new FileInputStream(res2.getFile()), trustPassphrase);
            TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
            tmf.init(tks);
            c = SSLContext.getInstance("TLSv1.2");//TODO
            c.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);//�������֤������Ϊnull ���jdk֤���ȥȡ
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
     * HttpClient����SSL
     */
    public static String ssl(String url, Map<String, Object> param, Integer type) {
        CloseableHttpClient httpclient = null;
        String result = "";
        try {
            KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
            ClassPathResource res2 = new ClassPathResource("truststore.ks");
            FileInputStream instream = new FileInputStream(res2.getFile());
            try {
                // ����keyStore d:\\tomcat.keystore
                trustStore.load(instream, "changeit".toCharArray());
            } catch (CertificateException e) {
                e.printStackTrace();
                System.out.println(e.toString());
            } finally {
                try {
                    instream.close();
                } catch (Exception ignore) {
                    System.out.println(ignore.toString());
                }
            }
            // �����Լ���CA��������ǩ����֤��
            SSLContext sslcontext = SSLContexts.custom().loadTrustMaterial(trustStore, new TrustSelfSignedStrategy()).build();
            // ֻ����ʹ��TLSv1Э��
            SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext, new String[]{"TLSv1"}, null,
                    SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
            httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
            // ����http����(get��ʽ)
            HttpPost httpPost = new HttpPost(url);
            // ������������
            List<NameValuePair> formparams = new ArrayList<NameValuePair>();
            for (String key : param.keySet()) {
                formparams.add(new BasicNameValuePair(key, param.get(key).toString()));
            }

            UrlEncodedFormEntity uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
            httpPost.setEntity(uefEntity);
            httpPost.setHeader("Content-Type", "application/x-www-form-urlencoded");

//            HttpGet httpget = new HttpGet("https://localhost:8443/myDemo/Ajax/serivceJ.action");  
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
