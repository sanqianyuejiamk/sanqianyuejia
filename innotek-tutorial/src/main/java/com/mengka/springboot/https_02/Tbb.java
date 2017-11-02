package com.mengka.springboot.https_02;

import lombok.extern.slf4j.Slf4j;

/**
 * @author huangyy
 * @date 2017/10/27.
 */
@Slf4j
public class Tbb {

    /**
     * keystore用于存放自己的密钥和公钥
     */
    public static final String clientKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/mykey.keystore";
    public static final String clientKeyStorePwd = "123456";
    public static final String foxclientKeyPwd = "123456";
    /**
     * truststore用于存放所有需要信任方的公钥
     */
    public static final String clientTrustKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/mykeytrust.keystore";
    public static final String clientTrustKeyStorePwd = "123456";

    public static void main(String[] args) throws Exception {
        String url = "https://127.0.0.1:8134/spring_mvc/m/tbb";

        // 密码
        String password = "111111";

        String keyStorePath = "/Users/hyy044101331/java_tools/apache-tomcat-8.0.46-wechat-https/conf/keys/tomcat.keystore";


        // 传输文本
        String xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><fruitShop><fruits><fruit>&lt;kind>萝卜</kind></fruit><fruit><kind>菠萝</kind></fruit></fruits></fruitShop>";
        HttpsPost.initHttpsURLConnection(clientKeyStorePwd, clientTrustKeyStorePwd, clientKeyStoreFile, clientTrustKeyStoreFile);
        // 发起请求
        String result = HttpsPost.post(url, xmlStr);
        log.info("result = {}", result);
    }
}
