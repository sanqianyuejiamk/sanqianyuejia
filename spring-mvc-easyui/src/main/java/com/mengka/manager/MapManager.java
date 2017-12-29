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
        mapCityDO1.setCount(5000);
        mapCityDO1.setNbCount(2000);
        mapCityDO1.setOtherCount(3000);
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
        mapCityDO2.setCount(5000);
        mapCityDO2.setNbCount(1000);
        mapCityDO2.setOtherCount(4000);
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
        mapCityDO3.setCount(3000);
        mapCityDO3.setNbCount(1000);
        mapCityDO3.setOtherCount(2000);
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
        mapCityDO4.setCount(1000);
        mapCityDO4.setNbCount(500);
        mapCityDO4.setOtherCount(500);
        map.put("深圳",mapCityDO4);

        //绍兴市
        MapCityDO mapCityDO5 = new MapCityDO();
        mapCityDO5.setName("绍兴市");
        mapCityDO5.setProvince("浙江省越城区曲屯路286号");
//        mapCityDO5.setLat("30.0327950816");
//        mapCityDO5.setLon("120.5754158967");
        mapCityDO5.setX(7616);
        mapCityDO5.setY(4131);
        mapCityDO5.setCityNo(46);
        mapCityDO5.setLevel(getCityLevel3());
        mapCityDO5.setCount(300);
        mapCityDO5.setNbCount(100);
        mapCityDO5.setOtherCount(200);
        map.put("绍兴",mapCityDO5);

        return map;
    }

    public MapCityLevelDto getCityLevel(){
        MapCityLevelDto levelDto = new MapCityLevelDto();
        levelDto.setRange(9);
        levelDto.setLevel(1);
        levelDto.setName("超过1000的城市");
        return levelDto;
    }

    public MapCityLevelDto getCityLevel2(){
        MapCityLevelDto levelDto = new MapCityLevelDto();
        levelDto.setRange(19);
        levelDto.setLevel(2);
        levelDto.setName("超过500的城市");
        return levelDto;
    }

    public MapCityLevelDto getCityLevel3(){
        MapCityLevelDto levelDto = new MapCityLevelDto();
        levelDto.setRange(39);
        levelDto.setLevel(3);
        levelDto.setName("低于500的城市");
        return levelDto;
    }

}
