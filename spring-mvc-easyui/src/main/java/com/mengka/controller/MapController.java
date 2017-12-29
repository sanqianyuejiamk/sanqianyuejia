package com.mengka.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.manager.MapManager;
import com.mengka.model.map.MapCityDO;
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
        String result = JSON.toJSONString(data);

        map.put("callback", callback);
        map.put("result", result);
        return "map/data";
    }
}
