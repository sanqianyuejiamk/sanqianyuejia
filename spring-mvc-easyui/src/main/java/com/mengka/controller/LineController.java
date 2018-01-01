package com.mengka.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletRequest;

/**
 *
 *  基础折线图例子
 *  https://www.highcharts.com/demo
 *
 * @author huangyy
 * @date 2017/12/29.
 */
@Controller
@RequestMapping("/line")
public class LineController {

    /**
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/line_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String map_01(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {


        return "line_01/line_01";
    }

}
