package com.mengka.springboot.controller;

import com.mengka.springboot.util.FileUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.Map;

/**
 * （纯JavaScript编写的开源股票图表控件）
 * highstock插件：
 *  https://api.highcharts.com/highstock/
 *
 * 下载：
 * https://www.evget.com/product/3310/download
 *
 * @author huangyy
 * @date 2017/10/22.
 */
@Log4j2
@Controller
@RequestMapping("/v2/cabbage")
public class CabbageController2 {

    /**
     *  股票走势图
     *
     * @return
     */
    @RequestMapping(value = "/aa", method = RequestMethod.GET)
    public String aa() {

        return "v2/result3";
    }

    /**
     *  http://127.0.0.1:8073/v2/cabbage/bb
     *
     * @return
     */
    @RequestMapping(value = "/bb", method = RequestMethod.GET)
    public String bb() {

        return "v2/result4";
    }

    @RequestMapping(value = "/bb/data", method = RequestMethod.GET)
    public String creditResult3(Map<String, Object> model) {
        String filePath = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/resources/data3.txt";
        model.put("result", FileUtil.readAll(filePath));
        return "result";
    }

}
