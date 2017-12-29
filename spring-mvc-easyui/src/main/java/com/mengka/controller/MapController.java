package com.mengka.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletRequest;

/**
 * @author huangyy
 * @date 2017/12/29.
 */
@Controller
@RequestMapping("/map")
public class MapController {

    @RequestMapping(value = "/map_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String topic(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {




        return "map/map_01";
    }
}
