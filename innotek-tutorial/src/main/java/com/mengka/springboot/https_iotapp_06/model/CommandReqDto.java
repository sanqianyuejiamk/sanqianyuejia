package com.mengka.springboot.https_iotapp_06.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/10/31.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommandReqDto {

    private String serviceId;

    private String method;

    @JsonProperty("paras")
    private Map<String,String> paras;
}
