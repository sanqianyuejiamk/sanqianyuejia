package com.mengka.springboot.https_iotapp_07;

import com.alibaba.fastjson.JSON;
import com.mengka.springboot.https_iotapp_07.util.HttpsUtil;
import com.mengka.springboot.https_iotapp_07.util.StreamClosedHttpResponse;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/08.
 */
@Log4j2
public class iotapp_config_01 {

    public static void main(String[] args) throws Exception {
        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices/config";

        Map<String, Object> queryParams = new HashMap<>();
        queryParams.put("deviceId", "359efafa-6e7f-4dd8-8e44-cba248e0a7c2");
        queryParams.put("manufacturerId", "CH");
        queryParams.put("manufacturerName", "innotek");
        queryParams.put("deviceType", "Sensor");
        queryParams.put("protocolType", "CoAP");
        queryParams.put("model", "Vehicle");
        queryParams.put("name", "39000049");
        queryParams.put("organization", "innotek2");
        queryParams.put("location", "\u676d\u5dde");

        Map<String, String> headerMap = new HashMap<>();

        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse streamClosedHttpResponse = httpsUtil.doPostJsonGetStatusLine(url, headerMap, JSON.toJSONString(queryParams));
        System.out.println("content = " + streamClosedHttpResponse.getContent());
    }
}
