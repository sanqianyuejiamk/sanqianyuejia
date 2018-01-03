package com.mengka.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletRequest;

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

    /**
     *  》》jQuery插件：
     *  https://www.jq22.com/jquery-info15186
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/city_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String map_01(ModelMap map, HttpServletRequest request,
                         @RequestParam(required = false) String groupName) {



        return "city_01/city_01";
    }

}
