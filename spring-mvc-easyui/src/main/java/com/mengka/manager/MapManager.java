package com.mengka.manager;

import com.mengka.model.map.MapCityDO;
import com.mengka.model.map.MapCityLevelDto;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/12/29.
 */
@Service
public class MapManager {

    public Map<String,MapCityDO> initData(){
        Map<String,MapCityDO> map = new HashMap<>();

        //北京市
        MapCityDO mapCityDO1 = new MapCityDO();
        mapCityDO1.setName("北京市");
        mapCityDO1.setProvince("北京市");
        mapCityDO1.setLat("39.9031324643");
        mapCityDO1.setLon("116.4010433787");
        mapCityDO1.setX(6763);
        mapCityDO1.setY(6381);
        mapCityDO1.setCityNo(1);
        mapCityDO1.setLevel(getCityLevel());
        map.put("北京",mapCityDO1);

        //上海市
        MapCityDO mapCityDO2 = new MapCityDO();
        mapCityDO2.setName("上海市");
        mapCityDO2.setProvince("上海市");
        mapCityDO2.setLat("31.2319526784");
        mapCityDO2.setLon("121.469443249");
        mapCityDO2.setX(7779);
        mapCityDO2.setY(4409);
        mapCityDO2.setCityNo(2);
        mapCityDO2.setLevel(getCityLevel());
        map.put("上海",mapCityDO2);

        //广州市
        MapCityDO mapCityDO3 = new MapCityDO();
        mapCityDO3.setName("广州市");
        mapCityDO3.setProvince("广州市");
        mapCityDO3.setLat("31.2319526784");
        mapCityDO3.setLon("121.469443249");
        mapCityDO3.setX(6173);
        mapCityDO3.setY(2560);
        mapCityDO3.setCityNo(3);
        mapCityDO3.setLevel(getCityLevel2());
        map.put("广州",mapCityDO3);

        //深圳市
        MapCityDO mapCityDO4 = new MapCityDO();
        mapCityDO4.setName("深圳市");
        mapCityDO4.setProvince("深圳市");
        mapCityDO4.setLat("39.9031324643");
        mapCityDO4.setLon("116.4010433787");
        mapCityDO4.setX(6163);
        mapCityDO4.setY(6381);
        mapCityDO4.setCityNo(4);
        mapCityDO4.setLevel(getCityLevel2());
        map.put("深圳",mapCityDO4);

        return map;
    }

    public MapCityLevelDto getCityLevel(){
        MapCityLevelDto levelDto = new MapCityLevelDto();
        levelDto.setRange(4);
        levelDto.setLevel(1);
        levelDto.setName("一线城市");
        return levelDto;
    }

    public MapCityLevelDto getCityLevel2(){
        MapCityLevelDto levelDto = new MapCityLevelDto();
        levelDto.setRange(19);
        levelDto.setLevel(2);
        levelDto.setName("新一线城市");
        return levelDto;
    }

}
