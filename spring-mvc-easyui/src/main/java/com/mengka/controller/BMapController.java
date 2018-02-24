package com.mengka.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.model.Park;
import com.mengka.model.ParkRecord;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author huangyy
 * @date 2018/01/07.
 */
@Controller
@RequestMapping("/bmap")
public class BMapController {

    @RequestMapping(value = "/map_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String map_01(ModelMap map, HttpServletRequest request,
                         @RequestParam(required = false) String groupName) {
        return "bmap/bmap_01";
    }

    @RequestMapping(value = "/map_02.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String map_02(ModelMap map, HttpServletRequest request,
                         @RequestParam(required = false) String groupName) {
        return "bmap/bmap_02";
    }

    @RequestMapping(value = "/getParkingList.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String getParkingList(ModelMap map, Integer cityCode, Integer regionCode, String parkId) {
        map.put("result", JSON.toJSONString(Collections.emptyList()));
        return "mengka/success";
    }

    @RequestMapping("/parkDetail")
    public String parkDetail(ModelMap map, HttpServletResponse resp, String parkId) {
        ParkRecord parkRecord = new ParkRecord();
        parkRecord.setCityCode(3301);
        List<ParkRecord> carList = new ArrayList<>();
        carList.add(parkRecord);
        Park park = new Park();
        park.setCarList(carList);
        park.setIdelBerthCount(9);
        map.put("result", JSON.toJSONString(park));
        return "mengka/success";
    }

    @RequestMapping("/initData")
    public String initData(ModelMap map, Integer cityCode, Integer regionCode) {
        Map<String, Object> result = new HashedMap();
        result.put("parkCnt", 100);
        result.put("totalBerthCnt", 100);
        result.put("idelBerthCnt", 9);
        result.put("busiBerthCnt", 12);
        map.put("result", JSON.toJSONString(result));
        return "mengka/success";
    }
}
