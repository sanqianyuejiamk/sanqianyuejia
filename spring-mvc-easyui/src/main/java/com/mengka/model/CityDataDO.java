package com.mengka.model;

import java.io.Serializable;

/**
 * @author huangyy
 * @date 2018/01/03.
 */
public class CityDataDO implements Serializable{

    private String value;

    private String text;

    public CityDataDO(String value,String text){
        this.value = value;
        this.text = text;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
