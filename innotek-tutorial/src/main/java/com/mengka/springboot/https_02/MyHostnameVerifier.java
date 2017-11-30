package com.mengka.springboot.https_02;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

/**
 * @author huangyy
 * @date 2017/10/26.
 */
public class MyHostnameVerifier implements HostnameVerifier {
    @Override
    public boolean verify(String hostname, SSLSession session) {
        if("localhost".equals(hostname)||"127.0.0.1".equals(hostname)||"121.41.33.245".equals(hostname)){
            return true;
        } else {
            return false;
        }
    }
}