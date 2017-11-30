package com.mengka.springboot.https_iotapp_07.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

/**
 * @author huangyy
 * @date 2017/11/01.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DataChangedSensorReqDto implements Serializable {

    private String head;
    private String flag;
    private String addr;
    private String seq;
    private String ctrlCode;
    private String opCode;
    private String dataLength;
    //	private String data;
    //data--start
    private String time;
    private String rssi;
    private String cellId;
    private String netSearchCnt;
    private String eventFlag;
    private String magX;
    private String magY;
    private String magZ;
    private String magVectorDelta;
    private String antiJamCParaX;
    private String sensorFlag1;
    private String sensorFlag2;
    private String antiJamCParaYZ;
    private String snr;
    private String ecl;
    private String received;
    private String turnoverNum;
    private String temperature;
    private String voltage;
    private String versionSoft;
    private String versionHard;
    private String carMoveAngle;
    private String carMoveVector;
    private String carStateAngle;
    private String carStateVector;
    private String imsi;
    private String udpBackupIp;
    private String udpBackupPort;
    //data--end
    private String crc;
    private String tail;
}
