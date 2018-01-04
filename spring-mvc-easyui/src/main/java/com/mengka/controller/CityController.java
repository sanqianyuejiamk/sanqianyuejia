package com.mengka.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.model.req.CityDataReq;
import com.mengka.model.rsp.CityDataSeriesRsp;
import com.mengka.model.rsp.dto.SeriesRspDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

/**
 * jQuery插件：
 * 1.jQuery city城市字母分类选择插件；
 *
 * @author huangyy
 * @date 2018/01/03.
 */
@Controller
@RequestMapping("/city")
public class CityController {

    private static final Logger log = LoggerFactory.getLogger(CityController.class);

    /**
     * 》》jQuery插件：
     * https://www.jq22.com/jquery-info15186
     * <p>
     * file:///Users/hyy044101331/Downloads/citySelect/index.html
     * <p>
     * http://127.0.0.1:8087/city/city_01.do
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/city_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String city_01(ModelMap map, HttpServletRequest request,
                          @RequestParam(required = false) String groupName) {
        return "city_01/city_01";
    }

    @RequestMapping(value = "/city_02.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String city_02(ModelMap map, HttpServletRequest request,
                          @RequestParam(required = false) String groupName) {
        return "city_01/city_02";
    }

    @RequestMapping(value = "/cityData.do", method = {RequestMethod.POST})
    public String cityData(ModelMap map, HttpServletRequest request) {
        log.info("---------, cityDataReq = " + JSON.toJSONString(11));

        Enumeration<String> params = request.getParameterNames();
        while(params.hasMoreElements()){
            log.info(params.nextElement());
        }


        String[] name = request.getParameterValues("name[]");
        String[] id = request.getParameterValues("id[]");


        List<SeriesRspDto> seriesList = new ArrayList<>();
        SeriesRspDto seriesRspDto = new SeriesRspDto();
        seriesRspDto.setName("test11");
        seriesRspDto.setData(new int[]{24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434});
        seriesList.add(seriesRspDto);
        if(name.length>1) {
            SeriesRspDto seriesRspDto2 = new SeriesRspDto();
            seriesRspDto2.setName("test22");
            seriesRspDto2.setData(new int[]{43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175});
            seriesList.add(seriesRspDto2);
        }
        if(name.length>2) {
            SeriesRspDto seriesRspDto3 = new SeriesRspDto();
            seriesRspDto3.setName("test33");
            seriesRspDto3.setData(new int[]{11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387});
            seriesList.add(seriesRspDto3);
        }
        if(name.length>3) {
            SeriesRspDto seriesRspDto4 = new SeriesRspDto();
            seriesRspDto4.setName("test44");
            seriesRspDto4.setData(new int[]{0, 0, 7988, 12169, 15112, 22452, 34400, 34227});
            seriesList.add(seriesRspDto4);
        }
        if(name.length>4) {
            SeriesRspDto seriesRspDto5 = new SeriesRspDto();
            seriesRspDto5.setName("test55");
            seriesRspDto5.setData(new int[]{12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111});
            seriesList.add(seriesRspDto5);
        }
        HashMap dataMap = new HashMap<>();
        dataMap.put("status", 0);
        dataMap.put("series", seriesList);

        map.put("result",JSON.toJSONString(dataMap));
        return "mengka/success";
    }
}
