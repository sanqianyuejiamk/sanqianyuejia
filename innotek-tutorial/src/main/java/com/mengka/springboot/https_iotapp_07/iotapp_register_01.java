package com.mengka.springboot.https_iotapp_07;

import com.alibaba.fastjson.JSON;
import com.mengka.springboot.https_iotapp_07.util.HttpsUtil;
import com.mengka.springboot.https_iotapp_07.util.StreamClosedHttpResponse;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/08.
 */
@Log4j2
public class iotapp_register_01 {

    public static void main(String[] args) throws Exception {
        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices";

        Map<String, Object> queryParams = new HashMap<>();
        queryParams.put("imei", "863703032543576");
        queryParams.put("manufacturerId", "CH");
        queryParams.put("manufacturerName", "innotek");
        queryParams.put("deviceType", "Sensor");
        queryParams.put("protocolType", "CoAP");
        queryParams.put("model", "Vehicle");
        queryParams.put("sensorAddr","39000049");

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Content-Type", "application/json");

        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse streamClosedHttpResponse = httpsUtil.doPutJsonGetStatusLine(url, headerMap, JSON.toJSONString(queryParams));
        log.info("result = " + streamClosedHttpResponse.getContent());

        /**
         *  863703032543576
         *  359efafa-6e7f-4dd8-8e44-cba248e0a7c2
         *
         *  对应传感器地址：39000049
         */
    }
}
