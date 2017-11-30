package com.mengka.springboot.https_iotapp_07;

import com.alibaba.fastjson.JSON;
import com.mengka.springboot.https_iotapp_06.model.CommandReqDto;
import com.mengka.springboot.https_iotapp_06.model.PostAsynCommandReq;
import com.mengka.springboot.https_iotapp_07.util.HttpsUtil;
import lombok.extern.log4j.Log4j2;
import org.apache.http.HttpResponse;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/08.
 */
@Log4j2
public class iotapp_cmd_post_01 {

    public static void main(String[] args) throws Exception {
        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/commands";

        String deviceId = "359efafa-6e7f-4dd8-8e44-cba248e0a7c2";
        String callbackUrl = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/commands/notify";

        Map<String, String> paras = new HashMap<>();
        paras.put("value", "12");
        CommandReqDto commandReqDto = new CommandReqDto();
        commandReqDto.setServiceId("SensorService");
        commandReqDto.setMethod("SET_TEMPERATURE_READ_PERIOD");
        commandReqDto.setParas(paras);
        PostAsynCommandReq postAsynCommandReq = new PostAsynCommandReq();
        postAsynCommandReq.setDeviceId(deviceId);
        postAsynCommandReq.setCallbackUrl(callbackUrl);
        postAsynCommandReq.setCommand(commandReqDto);

        Map<String, String> headerMap = new HashMap<>();

        HttpsUtil httpsUtil = new HttpsUtil();
        HttpResponse httpResponse = httpsUtil.doPostJson(url, headerMap, JSON.toJSONString(postAsynCommandReq));
        String responseBody = httpsUtil.getHttpResponseBody(httpResponse);
        int httpCode = httpResponse.getStatusLine().getStatusCode();

        log.info("httpCode = " + httpCode);
        log.info("responseBody = " + responseBody);
    }
}
