package com.mengka.model.req;

import java.io.Serializable;
import java.util.List;

/**
 * @author huangyy
 * @date 2018/01/04.
 */
public class CityDataReq implements Serializable {

    private String[] name;

    private int[] id;

    public String[] getName() {
        return name;
    }

    public void setName(String[] name) {
        this.name = name;
    }

    public int[] getId() {
        return id;
    }

    public void setId(int[] id) {
        this.id = id;
    }
}
