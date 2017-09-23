package com.mengka.controller;

import com.mengka.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletRequest;

/**
 * @author mengka
 * @date 2017/09/21.
 */
@Controller
@RequestMapping("/inno")
public class InnoController {

    @Autowired
    private UserManager userManager;

    @RequestMapping(value = "/aa.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String topic(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {
        map.put("list", userManager.initUserData());
        return "inno/aa";
    }

    @RequestMapping(value = "/bb.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String bb(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {
        return "inno/bb";
    }

    @RequestMapping(value = "/cc.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String cc(ModelMap map, HttpServletRequest request,
                     @RequestParam(required = false) String groupName) {
        return "inno/cc";
    }
}
