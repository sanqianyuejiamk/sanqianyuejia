package com.mengka.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.model.CityDataDO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @author huangyy
 * @date 2018/01/02.
 */
@Controller
@RequestMapping("/column")
public class ColumnController {

    @RequestMapping(value = "/column_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String map_01(ModelMap map, HttpServletRequest request,
                         @RequestParam(required = false) String groupName) {


        return "column_01/column_01";
    }

    /**
     *  https://www.highcharts.com/demo/column-stacked-percent
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/column_percent_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String column_percent(ModelMap map, HttpServletRequest request,
                         @RequestParam(required = false) String groupName) {


        return "column_01/column_stacked_percent";
    }

    @RequestMapping(value = "/city_data.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String initCityData(ModelMap map, HttpServletRequest request){

        List<CityDataDO> cityList = new ArrayList<CityDataDO>();
        CityDataDO cityDataDO1 = new CityDataDO("10","上海");
        CityDataDO cityDataDO2 = new CityDataDO("20","杭州");
        CityDataDO cityDataDO3 = new CityDataDO("30","深圳");
        CityDataDO cityDataDO4 = new CityDataDO("40","成都");
        CityDataDO cityDataDO5 = new CityDataDO("50","西安");
        cityList.add(cityDataDO1);
        cityList.add(cityDataDO2);
        cityList.add(cityDataDO3);
        cityList.add(cityDataDO4);
        cityList.add(cityDataDO5);

        map.put("result", JSON.toJSONString(cityList));
        return "mengka/success";
    }
}
