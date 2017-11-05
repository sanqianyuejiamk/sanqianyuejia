package com.mengka.springboot.https_01;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/10/24.
 */
@Slf4j
public class Taa {

    public static void main(String[] args) {

//        test_refreshToken();

//        test_login();

        test_subscribe();

        /**apache-tomcat-8.0.46-wechat-https测试*/
//        test_spring_mvc_mtbb();
    }

    /**
     *  {"accessToken":"1448f3d5d1c121b31a49976bd5f2b53b","tokenType":"bearer","expiresIn":3600,"scope":"default","refreshToken":"464737b8d488b536f9eb8b34d63f8d6"}
     *
     */
    public static void test_refreshToken() {
        String token_url = Constant.host_url + Constant.REFRESH_TOKEN_V2;


        Constant.ACCESS_TOKEN = "107abdc8d6ee58551b272131c6f7371";
        Constant.REFRESH_TOKEN = "af8687d58dc9400cf83819d578f5f";

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("appId", Constant.appid);
        map.put("secret", Constant.secret);
        map.put("refreshToken", Constant.REFRESH_TOKEN);

        String result = HttpsClientUtil.doPost(token_url, map, Constant.API_REFRESH_TOKEN);
        log.info("result = {}", result);
    }

    /**
     * {"accessToken":"107abdc8d6ee58551b272131c6f7371","tokenType":"bearer","refreshToken":"af8687d58dc9400cf83819d578f5f","expiresIn":3600,"scope":"default"}
     */
    public static void test_login() {
        String token_url = Constant.host_url + Constant.GET_TOKEN;
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("param_str", "appId=" + Constant.appid + "&secret=" + Constant.secret);
        String result = HttpsClientUtil.doPost(token_url, map, Constant.API_TYPE_TOKEN);

        log.info("result = {}", result);
    }

    public static void test_subscribe() {
        String subscribe_url = Constant.host_url + Constant.SUBSCRIBE_V2;

        Constant.ACCESS_TOKEN = "7819dad5286ec9ffc7ef39e43eb61d7";
        Constant.REFRESH_TOKEN = "be353d369f214c95cbd2ccfefecbf95";

        String callback_url = "https://121.41.33.245:18080/IOTApp/services/dataChanged/receiveData";

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("notifyType", Constant.NOTIFY_TYPE);
        map.put("callbackurl", callback_url);
        String result = HttpsClientUtil.doPost(subscribe_url, map, Constant.API_TYPE_SUBSCRIBE);

        log.info("result = {}", result);
    }

    public static void test_spring_mvc_mtbb() {
        String url = "https://127.0.0.1:8134/spring_mvc/m/tbb";
        String result = HttpsClientUtil.doPost(url, null, Constant.API_REFRESH_TOKEN);
        log.info("test_spring_mvc_mtbb result = {}", result);
    }
}
