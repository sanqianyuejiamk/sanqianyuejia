package com.mengka.springboot.https_01;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mengka.springboot.https_iotapp_07.util.StreamClosedHttpResponse;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/09.
 */
@Log4j2
public class iotapp_cmd_list_01 {

    public static void main(String[] args) throws Exception {
        String url = Constant.host_url + "/iocm/app/cmd/v1.4.0/deviceCommands";

        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("deviceId", "359efafa-6e7f-4dd8-8e44-cba248e0a7c2");
        queryParams.put("pageNo", "0");
        queryParams.put("pageSize", "10");
        queryParams.put("appId", Constant.appid);
//        queryParams.put("startTime","");
//        queryParams.put("endTime","");

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("app_key", Constant.appid);
        headerMap.put("Authorization", Constant.TOKEN_TYPE + " " + login());
        headerMap.put("Content-Type", "application/json");

        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse streamClosedHttpResponse = httpsUtil.doGetWithParasGetStatusLine(url, queryParams, headerMap);
        log.info(streamClosedHttpResponse.getStatusLine());
        log.info("result = " + streamClosedHttpResponse.getContent());
    }

    public static String login() throws Exception{
        String token_url = Constant.host_url + Constant.GET_TOKEN;
//        Map<String, Object> map = new HashMap<String, Object>();
//        map.put("param_str", "appId=" + Constant.appid + "&secret=" + Constant.secret);
//        String result = HttpsClientUtil.doPost(token_url, map, Constant.API_TYPE_TOKEN);


        Map<String, String> param = new HashMap<>();
        param.put("appId", Constant.appid);
        param.put("secret", Constant.secret);

        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse responseLogin = httpsUtil.doPostFormUrlEncodedGetStatusLine(token_url, param);

        log.info("login: "+responseLogin.getStatusLine());
        String result = responseLogin.getContent();

        JSONObject jsonObject = JSON.parseObject(result);
        return jsonObject.getString("accessToken");
    }
}
