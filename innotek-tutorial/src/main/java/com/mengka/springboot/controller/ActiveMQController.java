package com.mengka.springboot.controller;

import com.mengka.springboot.activemq_01.Producer;
import com.mengka.springboot.util.TimeUtil;
import lombok.extern.log4j.Log4j2;
import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.jms.Destination;
import java.util.Date;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/10/18.
 */
@Log4j2
@Controller
@RequestMapping("/v1/mq")
public class ActiveMQController {

    @Autowired
    private Producer producer;

    /**
     *  http://127.0.0.1:8075/v1/mq/send
     *
     * @param model
     * @return
     */
    @RequestMapping("/send")
    public String send(Map<String, Object> model) {
        log.info("啊啊producer send message.");

        Destination destination = new ActiveMQQueue("mytest.queue");
        for (int i = 0; i < 100; i++) {
            String message = "Just for test[" + TimeUtil.toDate(new Date(), TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS);
            producer.sendMessage(destination, message);
        }
        return "product_rate";
    }

    /**
     *  发送NOC消息
     *  http://127.0.0.1:8075/v1/mq/send2
     *
     * @param model
     * @return
     */
    @RequestMapping("/send2")
    public String send2(Map<String, Object> model) {
        log.info("send NOC message..");

        String message = "Just for test[" + TimeUtil.toDate(new Date(), TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS);
        producer.sendNocTopic(message);
        return "product_rate";
    }
}
