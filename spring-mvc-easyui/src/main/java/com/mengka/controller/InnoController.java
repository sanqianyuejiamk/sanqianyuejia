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

    /**
     *  CURD应用
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/aa.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String topic(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {
        map.put("list", userManager.initUserData());
        return "inno/aa";
    }

    /**
     *  region边框布局：east、west、north、south、center
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/bb.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String bb(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = false) String groupName) {
        return "inno/bb";
    }

    /**
     *  布局：折叠面板、标签页
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/cc.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String cc(ModelMap map, HttpServletRequest request,
                     @RequestParam(required = false) String groupName) {
        return "inno/cc";
    }

    /**
     *  复杂的表头
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/table_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String table_01(ModelMap map, HttpServletRequest request,
                     @RequestParam(required = false) String groupName) {
        map.put("list", userManager.initUserData());
        return "inno/table_01";
    }

    /**
     *  菜单
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/menu_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String menu_01(ModelMap map, HttpServletRequest request,
                           @RequestParam(required = false) String groupName) {
        return "inno/menu_01";
    }
}
