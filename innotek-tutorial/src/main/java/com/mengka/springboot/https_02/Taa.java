package com.mengka.springboot.https_02;

import lombok.extern.slf4j.Slf4j;

/**
 * @author huangyy
 * @date 2017/10/26.
 */
@Slf4j
public class Taa {

    /**
     *  client处理流程:
     *  1）加载client的keystore文件;
     *  2）加载client的truststore文件;
     *  3) 创建KeyManagerFactory对象并初始化;
     *  4) 创建TrustManagerFactory对象并初始化。truststore中存的是server的公钥，不需要keypass也可以访问;
     *  5）创建SSLContext并用3）和4）中创建的KeyManagerFactory和TrustManagerFactory对象来初始化;
     *  6）创建SSLSocketFactory，在指定的网络地址和端口上创建SSLSocket;
     *  7）在这个SSLSocket对象的输入输出流上进行读写;
     *
     * @param args
     * @throws Exception
     */
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
