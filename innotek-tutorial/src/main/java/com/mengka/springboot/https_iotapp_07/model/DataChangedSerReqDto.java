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
public class DataChangedSerReqDto implements Serializable {

    private String serviceType;

    private String serviceId;

    private DataChangedSensorReqDto data;

    private String eventTime;
}
