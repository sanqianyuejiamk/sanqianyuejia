package com.mengka.springboot.https_01;

/**
 * @author huangyy
 * @date 2017/10/24.
 */
public class Constant {

    //接口类型
    public static int API_TYPE_TOKEN = 0;
    public static int API_TYPE_SUBSCRIBE = 1;
    public static int API_DEVICE_REGISTER = 2;
    public static int API_DEVICE_CONFIG = 3;
    public static int API_REFRESH_TOKEN = 4;

    //1.3IOT
    public static String host_url = "https://112.93.129.154:8743";

    //1.3IOT
    public static String appid = "PirQbfXrMcOR3ca7xhus81fSsKIa";
    public static String secret = "UhU2J2urNnvxdRaZivBIh7f3hBUa";

    //存储最后一次获取的token值和有效期
    public static String ACCESS_TOKEN="";
    public static String REFRESH_TOKEN="";
    public static String TOKEN_EXPIRES="";
    public static String TOKEN_TYPE="bearer";

    /***************  IOT平台2.0 北向接口   ***********************/
    public static String REFRESH_TOKEN_V2="/iocm/app/sec/v1.1.0/refreshToken";
}
