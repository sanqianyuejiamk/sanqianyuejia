package com.mengka.springboot.https_iotapp_08;

import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/11.
 */
@Log4j2
public class Taa {

    public static void main(String[] args) throws Exception {
        /**
         *  GET请求
         */
        String url = "https://127.0.0.1:8073/cabbage-iotapp/api/v1/devices?pageNo=1&pageSize=10";
        String result1 = HttpsClientUtil.get(url);
        log.info("https get result = " + result1);

        /**
         *  POST请求
         */
        String url2 = "https://127.0.0.1:8073/cabbage-iotapp/api/v1/devices/config";

        Map<String, Object> queryParams = new HashMap<>();
        queryParams.put("deviceId", "359efafa-6e7f-4dd8-8e44-cba248e0a7c2");
        queryParams.put("manufacturerId", "CH");
        queryParams.put("manufacturerName", "innotek");
        queryParams.put("deviceType", "Sensor");
        queryParams.put("protocolType", "CoAP");
        queryParams.put("model", "Vehicle");
        queryParams.put("name", "39000049");
        queryParams.put("organization", "innotek1");
        queryParams.put("location", "\u676d\u5dde");

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Content-Type", "application/json");

        String result2 = HttpsClientUtil.post(url2, headerMap, queryParams);
        log.info("https config result2 = " + result2);
    }
}
