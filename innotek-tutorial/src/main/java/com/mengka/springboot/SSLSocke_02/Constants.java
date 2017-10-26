package com.mengka.springboot.SSLSocke_02;

/**
 *  双向认证的SSL/TLS协议通信
 *
 * 客户端和服务器端都要设置用于证实自己身份的安全证书，并且还要设置信任对方的哪些安全证书；
 *
 * 理论上一共需要准备四个文件，两个keystore文件和两个truststore文件。
 * 通信双方分别拥有一个keystore和一个truststore，keystore用于存放自己的密钥和公钥，truststore用于存放所有需要信任方的公钥。
 *
 * @author huangyy
 * @date 2017/10/26.
 */
public class Constants {

    public static final int SERVER_PORT = 11123;

    public static final String HOST = "localhost";

    /**keystore用于存放自己的密钥和公钥*/
    public static final String serverKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/tomcat.keystore";
    public static final String serverKeyStorePwd = "111111";//访问keystore需要storepass
    public static final String catServerKeyPwd = "111111";//访问密钥对需要keypass
    /**truststore用于存放所有需要信任方的公钥*/
    public static final String serverTrustKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/tomcattrust.keystore";
    public static final String serverTrustKeyStorePwd = "111111";

    /**keystore用于存放自己的密钥和公钥*/
    public static final String clientKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/mykey.keystore";
    public static final String clientKeyStorePwd = "123456";
    public static final String foxclientKeyPwd = "123456";
    /**truststore用于存放所有需要信任方的公钥*/
    public static final String clientTrustKeyStoreFile = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/java/com/mengka/springboot/SSLSocke_02/mykeytrust.keystore";
    public static final String clientTrustKeyStorePwd = "123456";
}
