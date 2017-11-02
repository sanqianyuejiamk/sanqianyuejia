package com.mengka.springboot.https_iotapp_03;

import com.mengka.springboot.https_02.HttpsPost;
import lombok.extern.slf4j.Slf4j;

/**
 * @author huangyy
 * @date 2017/10/27.
 */
@Slf4j
public class iotapp_01 {

    /**
     * keystore用于存放自己的密钥和公钥
     */
    public static final String clientKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/mykey.keystore";
    public static final String clientKeyStorePwd = "123456";
    public static final String foxclientKeyPwd = "123456";
    /**
     * truststore用于存放所有需要信任方的公钥
     */
    public static final String clientTrustKeyStoreFile = "/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/mykeytrust.keystore";
    public static final String clientTrustKeyStorePwd = "654321";

    public static void main(String[] args) throws Exception {
        String url = "https://127.0.0.1:18080/spring_mvc/m/tbb";

        // 传输文本
        String xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><fruitShop><fruits><fruit>&lt;kind>萝卜</kind></fruit><fruit><kind>菠萝</kind></fruit></fruits></fruitShop>";
        HttpsPost.initHttpsURLConnection(clientKeyStorePwd, clientTrustKeyStorePwd, clientKeyStoreFile, clientTrustKeyStoreFile);
        // 发起请求
        String result = HttpsPost.post(url, xmlStr);
        log.info("result = {}", result);
    }
}
