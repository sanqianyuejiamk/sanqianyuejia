package com.mengka.springboot.https_iotapp_07;

import com.mengka.springboot.https_iotapp_07.util.HttpsUtil;
import com.mengka.springboot.https_iotapp_07.util.StreamClosedHttpResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/08.
 */
public class iotapp_07 {

    public static void main(String[] args) throws Exception {
        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices";

        java.util.Map<String, String> queryParams = new HashMap<>();
        queryParams.put("pageNo","2");
        queryParams.put("pageSize","10");

        Map<String, String> headerMap = new HashMap<>();

        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse streamClosedHttpResponse = httpsUtil.doGetWithParasGetStatusLine(url, queryParams, headerMap);
        System.out.println("content = " + streamClosedHttpResponse.getContent());
    }
}
