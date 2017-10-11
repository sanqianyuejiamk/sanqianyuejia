package com.mengka.springboot.controller;

import com.alibaba.fastjson.JSON;
import com.mengka.springboot.util.TimeUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.*;

/**
 * @author huangyy
 * @date 2017/10/11.
 */
@Log4j2
@Controller
@RequestMapping("/v1/cabbage")
public class CabbageController {

    /**
     *  3000泊位压测数据
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "/data", method = RequestMethod.GET)
    public String creditResult(Map<String, Object> model) {

        String filePath = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/resources/data2.txt";
        List list = getData(filePath);


        model.put("result",JSON.toJSONString(list));
        return "result";
    }

    /**
     *  30000泊位压测数据
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "/data3", method = RequestMethod.GET)
    public String creditResult3(Map<String, Object> model) {

        String filePath = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/resources/data_30000.txt";
        List list = getData(filePath);

        model.put("result",JSON.toJSONString(list));
        return "result";
    }

    public List getData(String filePath){
        Scanner scanner = mkReadFile(filePath);

        List list = new ArrayList();
        while (scanner.hasNext()) {
            String content = scanner.nextLine();
            log.info("content = "+content);
            String[] contents = content.split(",");
            Date time = TimeUtil.toDate(contents[0].trim(),TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS);
            //趋势图数据
            Object[] objs = new Object[]{TimeUtil.getUTCTime(time),Integer.parseInt(contents[1].trim())};
            list.add(objs);
        }
        return list;
    }

    /**
     *  http://127.0.0.1:8073/v1/cabbage/aa
     *
     *  https://www.highcharts.com/demo/line-time-series
     *
     * @return
     */
    @RequestMapping(value = "/aa", method = RequestMethod.GET)
    public String aa() {

        return "result2";
    }

    /**
     * 按行读取文件内容，返回 Scanner
     *
     * @param fileString
     *            输入文件的存放路径
     * @return
     */
    public static Scanner mkReadFile(String fileString) {
        File f = new File(fileString);
        InputStream st = null;
        try {
            st = new FileInputStream(f);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        Scanner in = new Scanner(st);
        return in;
    }
}
