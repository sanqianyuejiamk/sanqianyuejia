package com.mengka.springboot.https_iotapp_07.model;

import lombok.Data;
import java.io.Serializable;

/**
 * @author huangyy
 * @date 2017/11/01.
 */
@Data
public class DataChangedReq implements Serializable {

    private String requestId;

    private String deviceId;

    private String gatewayId;

    private DataChangedSerReqDto service;

    private String notifyType;

    private String manufacturerId;//之后加的属性，如果解析不了可以删除该属性
}
