package com.mengka.springboot.https_iotapp_08;

import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/12.
 */
@Log4j2
public class Tbb {

    public static void main(String[] args)throws Exception{
        String url = "https://127.0.0.1:8073/cabbage-iotapp/api/v1/devices/subscribe";

        Map<String, Object> queryParams = new HashMap<>();
        queryParams.put("notifyType", 3);
        queryParams.put("callbackurl", "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices/receive");

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Content-Type", "application/json");

        String result2 = HttpsClientUtil.post(url, headerMap, queryParams);
        log.info("https config result2 = " + result2);
    }
}
