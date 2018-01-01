package com.mengka.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.manager.MapManager;
import com.mengka.model.map.MapCityDO;
import com.mengka.model.map.MapDataDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 *
 *  中国地图，每个省市
 *  https://www.hcharts.cn/mapdata
 *
 * @author huangyy
 * @date 2017/12/29.
 */
@Controller
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapManager mapManager;

    /**
     *  我国共有34个省级行政区域，包括23个省，5个自治区，4个直辖市，以及香港，澳门2个特别行政区。
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/map_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String map_01(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {


        return "map/map_01";
    }

    @RequestMapping(value = "/map_02.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String map_02(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {

        return "map/map_02";
    }


    @RequestMapping(value = "/data.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String data(ModelMap map, @RequestParam(required = false) String callback) {

        Map<String,MapCityDO> data = mapManager.initData();
        MapDataDO mapDataDO = new MapDataDO();
        mapDataDO.setData(data);
        mapDataDO.setTotal(15450);
        mapDataDO.setCityCount(15);
        String result = JSON.toJSONString(mapDataDO);

        map.put("callback", callback);
        map.put("result", result);
        return "map/data";
    }
}
