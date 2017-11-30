package com.mengka.springboot.https_iotapp_06;

import com.alibaba.fastjson.JSON;
import com.mengka.springboot.https_02.HttpsPost;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/11/08.
 */
@Slf4j
public class iotapp_ys_03 {

    /**
     * keystore用于存放自己的密钥和公钥
     */
    public static final String clientKeyStoreFile = "/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/cabbage_client/cabbage.keystore";
    public static final String clientKeyStorePwd = "123456";

    /**
     * truststore用于存放所有需要信任方的公钥
     */
    public static final String clientTrustKeyStoreFile = "/Users/hyy044101331/java_tools/tomcat-iotapp_sz1.3/conf/keys/cabbage_client/cabbagetrust.keystore";
    public static final String clientTrustKeyStorePwd = "123456";

    public static void main(String[] args) throws Exception {
//        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/commands";
//        String deviceId = "512cfa20-98a5-4c72-b639-c0bbaff6204f";
//        String callbackUrl = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/commands/notify";
//
//        // 传输文本
//        Map<String,String> paras = new HashMap<>();
//        paras.put("value","12");
//        CommandReqDto commandReqDto = new CommandReqDto();
//        commandReqDto.setServiceId("SensorService");
//        commandReqDto.setMethod("SET_TEMPERATURE_READ_PERIOD");
//        commandReqDto.setParas(paras);
//        PostAsynCommandReq postAsynCommandReq = new PostAsynCommandReq();
//        postAsynCommandReq.setDeviceId(deviceId);
//        postAsynCommandReq.setCallbackUrl(callbackUrl);
//        postAsynCommandReq.setCommand(commandReqDto);
//        String xmlStr = JSON.toJSONString(postAsynCommandReq);
//
//        HttpsPost.initHttpsURLConnection(clientKeyStorePwd, clientTrustKeyStorePwd, clientKeyStoreFile, clientTrustKeyStoreFile);
//        // 发起请求
//        String result = HttpsPost.post(url, xmlStr);
//        log.info("result = {}", result);


        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices";

        Map<String,Object> paras = new HashMap<>();
        paras.put("imei","863703030135489");
        String result = HttpsClientUtil.put(url,paras);
        log.info("result = {}", result);
    }
}
