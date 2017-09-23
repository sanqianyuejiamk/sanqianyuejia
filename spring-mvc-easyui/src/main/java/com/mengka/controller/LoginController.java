package com.mengka.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

/**
 * 》》基于usercenter-client实现的用户登录系统；
 * <p/>
 * 》》访问http://www.mengka.com:8080/mk/topic.do，用户没有登录，
 * 跳转到http://sso.mengka.com:8080/user/login.do登录页面；
 * <p/>
 * <p/>
 * 》》输入账号密码之后，登录系统，用户信息记录到cookie中，保证用户的登录状态；
 * <p/>
 * 》》输入http://sso.mengka.com:8080/user/logout.do，清除了注册的用户信息，用户在此访问就需要重新登录；
 * <p/>
 * User: mengka
 * Date: 15-5-31-下午2:34
 */
@Controller
@RequestMapping("/user")
public class LoginController {

    /**
     * 账号：mengka/111111
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/login.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String userLogin(ModelMap map, HttpServletRequest request,
                            @RequestParam(required = false) String groupName) {
        return "mengka/login";
    }

    @RequestMapping(value = "/loginSystem.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String login(ModelMap map, HttpServletRequest request,
                        @RequestParam(required = true) String name,
                        @RequestParam(required = true) String password) {


        return "mengka/login";
    }

    /**
     * 退出登录
     *
     * @param map
     * @param request
     * @param groupName
     * @return
     */
    @RequestMapping(value = "/logout.do", method = {RequestMethod.GET, RequestMethod.POST})
    public String logout(ModelMap map, HttpServletRequest request,
                         @RequestParam(required = false) String groupName) {

        return "mengka/login";
    }
}
