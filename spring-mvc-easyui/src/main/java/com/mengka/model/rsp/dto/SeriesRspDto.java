package com.mengka.model.rsp.dto;

import java.io.Serializable;

/**
 * @author huangyy
 * @date 2018/01/04.
 */
public class SeriesRspDto implements Serializable {

    private String name;

    private int[] data;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int[] getData() {
        return data;
    }

    public void setData(int[] data) {
        this.data = data;
    }
}
