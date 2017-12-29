package com.mengka.model.map;

/**
 * @author huangyy
 * @date 2017/12/29.
 */
public class MapCityDO {

    private String name;

    private String province;

    private String lat;

    private String lon;

    private Integer x;

    private Integer y;

    private MapCityLevelDto level;

    private Integer cityNo;

    public Integer count;//泊位总数量

    public Integer nbCount;//NB-IOT泊位数量

    public Integer otherCount;//普通泊位数量

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public MapCityLevelDto getLevel() {
        return level;
    }

    public void setLevel(MapCityLevelDto level) {
        this.level = level;
    }

    public Integer getCityNo() {
        return cityNo;
    }

    public void setCityNo(Integer cityNo) {
        this.cityNo = cityNo;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getNbCount() {
        return nbCount;
    }

    public void setNbCount(Integer nbCount) {
        this.nbCount = nbCount;
    }

    public Integer getOtherCount() {
        return otherCount;
    }

    public void setOtherCount(Integer otherCount) {
        this.otherCount = otherCount;
    }
}
