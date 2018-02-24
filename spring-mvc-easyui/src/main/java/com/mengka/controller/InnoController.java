package com.mengka.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.manager.UserManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * EasyUI教程:
 * http://www.runoob.com/jeasyui/jqueryeasyui-tutorial.html
 *
 * @author mengka
 * @date 2017/09/21.
 */
@Slf4j
@Controller
@RequestMapping("/inno")
public class InnoController {

    @Autowired
    private UserManager userManager;

    /**
     * CURD应用
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
     * region边框布局：east、west、north、south、center
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
     * 布局：折叠面板、标签页
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
     * 复杂的表头
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
     * 菜单
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

    @RequestMapping(value = "/portal_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String portal_01(ModelMap map, HttpServletRequest request,
                            @RequestParam(required = false) String groupName) {
        return "inno/portal_01";
    }

    @RequestMapping(value = "/portal_02.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String portal_02(ModelMap map, HttpServletRequest request,
                            @RequestParam(required = false) String groupName) {
        return "inno/portal_02";
    }

    @RequestMapping(value = "/datagrid_data.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String datagrid_data(ModelMap map, HttpServletRequest request,
                                @RequestParam(required = false) String groupName) throws Exception {
        String path = "datagrid_data.json";
        map.put("result", readFile(path));
        return "mengka/success";
    }

    public String readFile(String path) {
        String result = "";
        StringBuffer stringBuffer = new StringBuffer();
        try {
            InputStreamReader inputStreamReader = new InputStreamReader(
                    new ClassPathResource(path).getInputStream());
            BufferedReader bufferedReader = new BufferedReader(
                    inputStreamReader);
            stringBuffer = new StringBuffer();
            int str;
            while ((str = bufferedReader.read()) != -1) {
                stringBuffer.append((char) str);
            }
            result = stringBuffer.toString();
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return result;
    }

    /**
     *  http://127.0.0.1:8087/inno/portal_03.do
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/portal_03.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String portal_03(ModelMap map, HttpServletRequest request,
                            @RequestParam(required = false) String groupName) {
        return "inno/portal_03";
    }

    @RequestMapping(value = "/portal_p1.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String portal_p1(ModelMap map, HttpServletRequest request,
                            @RequestParam(required = false) String groupName) {
        return "inno/portal_p1";
    }

    @RequestMapping(value = "/combobox_01.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String combobox_01(ModelMap map, HttpServletRequest request,
                            @RequestParam(required = false) String groupName) {
        return "inno/combobox_01";
    }

    @RequestMapping(value = "/combobox_data.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String combobox_data(ModelMap map, HttpServletRequest request,
                              @RequestParam(required = false) String groupName) {
        List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
        Map<String, Object> jsonObj = new HashMap<String, Object>();
        jsonObj.put("id", "3301");
        jsonObj.put("name", "杭州市");
        items.add(jsonObj);
        Map<String, Object> jsonObj2 = new HashMap<String, Object>();
        jsonObj2.put("id", "3302");
        jsonObj2.put("name", "北京市");
        items.add(jsonObj2);
        Map<String, Object> jsonObj3 = new HashMap<String, Object>();
        jsonObj3.put("id", "3303");
        jsonObj3.put("name", "上海市");
        items.add(jsonObj3);
        map.put("result", JSON.toJSONString(items));
        return "inno/combobox_01";
    }
}
