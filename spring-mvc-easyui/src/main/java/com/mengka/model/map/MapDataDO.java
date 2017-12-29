package com.mengka.model.map;

import java.util.Map;

/**
 * @author huangyy
 * @date 2017/12/29.
 */
public class MapDataDO {

    public Integer total;

    public Integer cityCount;

    public Map<String,MapCityDO> data;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Map<String, MapCityDO> getData() {
        return data;
    }

    public void setData(Map<String, MapCityDO> data) {
        this.data = data;
    }

    public Integer getCityCount() {
        return cityCount;
    }

    public void setCityCount(Integer cityCount) {
        this.cityCount = cityCount;
    }
}
