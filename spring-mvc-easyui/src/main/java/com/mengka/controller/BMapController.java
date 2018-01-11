package com.mengka.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

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
}
