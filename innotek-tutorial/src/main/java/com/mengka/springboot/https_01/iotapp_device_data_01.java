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
public class iotapp_device_data_01 {

    public static void main(String[] args) throws Exception {
        String url = Constant.host_url + "/iocm/app/data/v1.1.0/deviceDataHistory";

        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("deviceId", "359efafa-6e7f-4dd8-8e44-cba248e0a7c2");
        queryParams.put("gatewayId", "359efafa-6e7f-4dd8-8e44-cba248e0a7c2");
        queryParams.put("serviceId", "SensorService");
        queryParams.put("appId", Constant.appid);
        queryParams.put("pageNo", "0");
        queryParams.put("pageSize", "10");
//        queryParams.put("startTime", "20171101T000000Z");
//        queryParams.put("endTime", "20171130T000000Z");

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("app_key", Constant.appid);
        headerMap.put("Authorization", Constant.TOKEN_TYPE + " " + iotapp_cmd_list_01.login());
        headerMap.put("Content-Type", "application/json");

        //total=44
        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse streamClosedHttpResponse = httpsUtil.doGetWithParasGetStatusLine(url, queryParams, headerMap);
        log.info(streamClosedHttpResponse.getStatusLine());
        log.info("result = " + streamClosedHttpResponse.getContent());

        JSONObject jsonObject = JSON.parseObject(streamClosedHttpResponse.getContent());
        Integer totalCount = jsonObject.getInteger("totalCount");
        log.info("totalCount = " + totalCount);
    }

}
