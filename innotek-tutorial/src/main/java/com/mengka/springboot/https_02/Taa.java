package com.mengka.springboot.https_02;

import lombok.extern.slf4j.Slf4j;

/**
 * @author huangyy
 * @date 2017/10/26.
 */
@Slf4j
public class Taa {

    public static void main(String[] args) throws Exception {
        String url = "https://127.0.0.1:8134/spring_mvc/m/tbb";

        // 密码
        String password = "111111";
        // 密钥库
        String keyStorePath = "/Users/hyy044101331/java_tools/apache-tomcat-8.0.46-wechat-https/conf/keys/tomcat.keystore";
        // 信任库
        String trustStorePath = "/Users/hyy044101331/java_tools/apache-tomcat-8.0.46-wechat-https/conf/keys/tomcat.keystore";
        // 传输文本
        String xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><fruitShop><fruits><fruit>&lt;kind>萝卜</kind></fruit><fruit><kind>菠萝</kind></fruit></fruits></fruitShop>";
        HttpsPost.initHttpsURLConnection(password, keyStorePath, trustStorePath);
        // 发起请求
        String result = HttpsPost.post(url, xmlStr);
        log.info("result = {}", result);
    }
}
