package com.mengka.springboot.https_iotapp_07;

import com.alibaba.fastjson.JSON;
import com.mengka.springboot.https_iotapp_07.model.DataChangedReq;
import com.mengka.springboot.https_iotapp_07.model.DataChangedSensorReqDto;
import com.mengka.springboot.https_iotapp_07.model.DataChangedSerReqDto;
import com.mengka.springboot.https_iotapp_07.util.HttpsUtil;
import com.mengka.springboot.https_iotapp_07.util.StreamClosedHttpResponse;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * sh-3.2# pwd
 * /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/back_keystore
 * <p>
 * scp mykey.cer root@121.41.33.245:/opt/app_server/run/cabbage-iotapp/.
 * <p>
 * /usr/java/default/bin/keytool -import -v -file mykey.cer -alias client_out -keystore tomcattrust.keystore
 * <p>
 * /usr/java/default/bin/keytool -list -keystore tomcattrust.keystore
 * 123456
 * <p>
 * /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/back_keystore/mykey.key
 * /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/back_keystore/mykey.crt
 * <p>
 * https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices?pageNo=1&pageSize=10
 *
 *
 *
 * @author huangyy
 * @date 2017/11/13.
 */
@Log4j2
public class iotapp_receive_01 {

    public static void main(String[] args) throws Exception {
        String url = "https://121.41.33.245:8073/cabbage-iotapp/api/v1/devices/receive";

        DataChangedReq changedReq = initData();

        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Content-Type", "application/json");

        HttpsUtil httpsUtil = new HttpsUtil();
        StreamClosedHttpResponse streamClosedHttpResponse = httpsUtil.doPostJsonGetStatusLine(url, headerMap, JSON.toJSONString(changedReq));
        log.info("result = " + streamClosedHttpResponse.getContent());
    }

    public static DataChangedReq initData() {
        //设备变更数据
        DataChangedSensorReqDto changedSensorReqDto = new DataChangedSensorReqDto();
        changedSensorReqDto.setHead("123");
        changedSensorReqDto.setFlag("96");
        changedSensorReqDto.setAddr("57,0,0,68");
        changedSensorReqDto.setSeq("58");
        changedSensorReqDto.setCtrlCode("17");
        changedSensorReqDto.setOpCode("170");
        changedSensorReqDto.setDataLength("32");
        changedSensorReqDto.setTime("17,9,28,21,23,56");
        changedSensorReqDto.setRssi("168");
        changedSensorReqDto.setCellId("0,164");
        changedSensorReqDto.setNetSearchCnt("0");
        changedSensorReqDto.setEventFlag("24");
        changedSensorReqDto.setMagX("251,199");
        changedSensorReqDto.setMagY("254,146");
        changedSensorReqDto.setMagZ("255,227");
        changedSensorReqDto.setMagVectorDelta("0,238");
        changedSensorReqDto.setAntiJamCParaX("7");
        changedSensorReqDto.setSensorFlag1("50");
        changedSensorReqDto.setSensorFlag2("16");
        changedSensorReqDto.setAntiJamCParaYZ("119");
        changedSensorReqDto.setSnr("29");
        changedSensorReqDto.setEcl("0");
        changedSensorReqDto.setReceived("0,0");
        changedSensorReqDto.setTurnoverNum("0");
        changedSensorReqDto.setTemperature("26");
        changedSensorReqDto.setVoltage("60");
        changedSensorReqDto.setVersionHard("0");
        changedSensorReqDto.setVersionSoft("37");
        changedSensorReqDto.setCarMoveAngle("3");
        changedSensorReqDto.setCarMoveVector("6");
        changedSensorReqDto.setCarStateAngle("8");
        changedSensorReqDto.setCarStateVector("40");
        changedSensorReqDto.setImsi("55,50,52,48,50,50,50,48,50,53,50,49,48,52,56,0");
        changedSensorReqDto.setUdpBackupIp("60,191,61,178");
        changedSensorReqDto.setUdpBackupPort("130,54");
        changedSensorReqDto.setCrc("34,153");
        changedSensorReqDto.setTail("125");

        DataChangedSerReqDto changedSerReqDto = new DataChangedSerReqDto();
        changedSerReqDto.setServiceId("SensorService");
        changedSerReqDto.setServiceType("SensorService");
        changedSerReqDto.setEventTime("20170928T212147Z");
        changedSerReqDto.setData(changedSensorReqDto);
        //数据变更回调请求数据
        DataChangedReq changedReq = new DataChangedReq();
        changedReq.setDeviceId("9d40834d-4721-4a46-9ce0-61ba01cc0a52");
        changedReq.setGatewayId("9d40834d-4721-4a46-9ce0-61ba01cc0a52");
        changedReq.setRequestId(UUID.randomUUID().toString());
        changedReq.setNotifyType("deviceInfoChanged");
        changedReq.setService(changedSerReqDto);
        return changedReq;
    }
}
