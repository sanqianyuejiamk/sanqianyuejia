package com.mengka.model;

import lombok.Data;
import java.io.Serializable;

/**
 * @author huangyy
 * @date 2017/09/23.
 */
@Data
public class ResultDO implements Serializable{

    private boolean success;

    private String errorMsg;
}
