package com.mengka.springboot.https_iotapp_05;

import com.mengka.springboot.https_02.HttpsPost;
import lombok.extern.slf4j.Slf4j;

/**
 * spring boot https双向认证验证
 * <p>
 * server.port=8073
 * server.ssl.key-store=/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/tomcat.keystore
 * server.ssl.key-store-password=123456
 * server.ssl.keyStoreType=JKS
 * server.ssl.keyAlias=tomcat
 * server.ssl.client-auth=need
 * server.ssl.trust-store=/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/tomcattrust.keystore
 * server.ssl.trust-store-password=123456
 * server.ssl.trust-store-type=JKS
 *
 * @author huangyy
 * @date 2017/11/01.
 */
@Slf4j
public class iotapp_02 {

    /**
     * keystore用于存放自己的密钥和公钥
     */
    public static final String clientKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/mykey.keystore";
    public static final String clientKeyStorePwd = "123456";
    public static final String foxclientKeyPwd = "123456";


//    public static final String clientKeyStoreFile = "/Users/hyy044101331/java_tools/apache-tomcat-8.0.46-wechat-https/conf/keys/tomcat.keystore";
//    public static final String clientKeyStorePwd = "111111";
//    public static final String foxclientKeyPwd = "111111";


    /**
     * truststore用于存放所有需要信任方的公钥
     */
    public static final String clientTrustKeyStoreFile = "/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/mykeytrust.keystore";
    public static final String clientTrustKeyStorePwd = "654321";


    /**
     *  postman配置:
     *  127.0.0.1:8073
     *  /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/back_keystore/mykey.key
     *  /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/back_keystore/mykey.crt
     *  123456
     *
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        String url = "https://127.0.0.1:8073/cabbage-iotapp/api/v1/devices?pageNo=1&pageSize=10";

        // 传输文本
        String xmlStr = "";
        HttpsPost.initHttpsURLConnection(clientKeyStorePwd, clientTrustKeyStorePwd, clientKeyStoreFile, clientTrustKeyStoreFile);
        // 发起请求
        String result = HttpsPost.post(url, xmlStr);
        log.info("result = {}", result);
    }
}
