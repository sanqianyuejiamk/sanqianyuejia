package com.mengka.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.model.ResultDO;
import com.mengka.model.UserDO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import javax.servlet.http.HttpServletRequest;

/**
 * @author huangyy
 * @date 2017/09/23.
 */
@Slf4j
@Controller
@RequestMapping("/user")
public class UserActionController {

    @RequestMapping(value = "/save.do", method = { RequestMethod.GET, RequestMethod.POST })
    public String save(ModelMap map, HttpServletRequest request,
                       @RequestParam(required = false) String firstname,
                       @ModelAttribute UserDO userDO) {
        log.info("save user {}: {}",firstname, JSON.toJSONString(userDO));
        return "mengka/success";
    }

    @RequestMapping(value = "/update.do", method = { RequestMethod.GET, RequestMethod.POST })
    public String update(ModelMap map, HttpServletRequest request,
                         @ModelAttribute UserDO userDO) {
        log.info("update user [{}]",JSON.toJSON(userDO));

        ResultDO resultDO = new ResultDO();
        resultDO.setSuccess(true);
        map.put("result",resultDO);
        return "mengka/success";
    }

    @RequestMapping(value = "/destroy.do", method = { RequestMethod.POST })
    public String destroy(ModelMap map, HttpServletRequest request,
                         @ModelAttribute UserDO userDO) {
        log.info("destroy user [{}]",JSON.toJSON(userDO));

        ResultDO resultDO = new ResultDO();
        resultDO.setSuccess(true);
        map.put("result",resultDO);
        return "mengka/success";
    }
}
