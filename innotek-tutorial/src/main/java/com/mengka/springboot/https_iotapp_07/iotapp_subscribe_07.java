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
public class iotapp_subscribe_07 {

    public static void main(String[] args) throws Exception {
        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices/subscribe";

        Map<String, Object> queryParams = new HashMap<>();
        queryParams.put("notifyType", 3);
        queryParams.put("callbackurl", "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices/receive");

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Content-Type", "application/json");

        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse streamClosedHttpResponse = httpsUtil.doPostJsonGetStatusLine(url, headerMap, JSON.toJSONString(queryParams));
        log.info("subscribe device result = " + streamClosedHttpResponse.getContent());
    }


}
