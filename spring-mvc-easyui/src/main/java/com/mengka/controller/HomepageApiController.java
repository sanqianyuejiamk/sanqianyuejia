//package com.mengka.controller;
//
//import com.alibaba.fastjson.JSON;
//import com.mengka.common.StringUtils;
//import com.mengka.manager.MapManager;
//import com.mengka.model.map.MapCityDO;
//import com.mengka.model.map.MapDataDO;
//import com.mengka.utils.ChineseUnicodeUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Map;
//
///**
// * @author huangyy
// * @date 2018/01/03.
// */
//@RestController
//@RequestMapping("/homepage/api")
//public class HomepageApiController {
//
//    @Autowired
//    private MapManager mapManager;
//
//    @RequestMapping(value = "/mapData.action", method = {RequestMethod.GET, RequestMethod.POST})
//    public String mapData(HttpServletResponse resp, @RequestParam(required = false) String callback) {
//        Map<String,MapCityDO> data = mapManager.initData();
//
//        MapDataDO mapDataDO = new MapDataDO();
//        mapDataDO.setData(data);
//        mapDataDO.setTotal(15450);
//        mapDataDO.setCityCount(15);
//        callback = StringUtils.isNotBlank(callback) ? callback : "";
//        String result = callback + "(" + JSON.toJSONString(mapDataDO) + ")";
//
//        return ChineseUnicodeUtil.chinese2Unicode(result);
//    }
//}
