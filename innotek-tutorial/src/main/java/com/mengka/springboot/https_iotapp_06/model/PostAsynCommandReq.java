package com.mengka.springboot.https_iotapp_06.model;

import lombok.Data;
import java.io.Serializable;

/**
 * @author huangyy
 * @date 2017/10/31.
 */
@Data
public class PostAsynCommandReq implements Serializable {

    private String deviceId;

    private CommandReqDto command;

    private String callbackUrl;
}
