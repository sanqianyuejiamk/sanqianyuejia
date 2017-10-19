package com.mengka.springboot.activemq_01;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.jms.Destination;
import javax.jms.Topic;

/**
 * @author huangyy
 * @date 2017/10/18.
 */
@Service
public class Producer {

    private static final Logger log = LogManager.getLogger(Producer.class);

    @Autowired
    private JmsMessagingTemplate jmsTemplate;

    @Autowired
    private Topic topic;

    /**
     * 发送消息
     *
     * @param destination 发送到的队列
     * @param message     待发送的消息
     */
    public void sendMessage(Destination destination, final String message) {
        log.info("send message..");
        jmsTemplate.convertAndSend(destination, message);
    }

    /**
     *  发送NOC消息
     *
     * @param message
     */
    public void sendNocTopic(final String message) {
        jmsTemplate.convertAndSend(this.topic, message);
    }
}
