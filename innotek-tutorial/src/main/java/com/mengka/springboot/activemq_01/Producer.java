package com.mengka.springboot.activemq_01;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;
import javax.jms.*;

/**
 * @author huangyy
 * @date 2017/10/18.
 */
@Service
public class Producer {

    private static final Logger log = LogManager.getLogger(Producer.class);

    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

    private JmsTemplate jmsTemplate;

    @Autowired
    private Topic topic;

    @Autowired
    @Qualifier("baicaiTopic")
    private Topic baicaiTopic;

    /**
     * 发送消息
     *
     * @param destination 发送到的队列
     * @param message     待发送的消息
     */
    public void sendMessage(Destination destination, final String message) {
        log.info("send message..");
        jmsMessagingTemplate.convertAndSend(destination, message);
    }

    /**
     *  发送NOC消息
     *
     * @param message
     */
    public void sendNocTopic(final String message) {
        jmsMessagingTemplate.convertAndSend(this.topic, message);
    }

    /**
     *  发送NOC消息
     *
     * @param message
     */
    public void sendNocByteTopic(final String message)throws Exception{
        jmsMessagingTemplate.convertAndSend(this.baicaiTopic, message.getBytes());
    }
}
