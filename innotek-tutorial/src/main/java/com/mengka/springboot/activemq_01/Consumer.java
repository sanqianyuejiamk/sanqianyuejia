package com.mengka.springboot.activemq_01;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

/**
 * @author huangyy
 * @date 2017/10/18.
 */
@Service
public class Consumer {

    private static final Logger log = LogManager.getLogger(Consumer.class);

    /**
     * 监听队列：mytest.queue
     *
     * @param text
     */
    @JmsListener(destination = "mytest.queue",containerFactory = "defaultContainerFactory",concurrency="5-10")
    public void receiveQueue(String text) {
        log.info("receive message: " + text);
    }

    /**
     * 监听topic：noc_msg
     *
     * @param text
     */
    @JmsListener(destination = "noc_msg1",containerFactory = "myFactory",subscription="cabbage-pro-listener2")
    public void receiveNocTopic(String text) {
        log.info("receive noc_msg message: " + text);
    }

    /**
     * 监听topic：noc_msg2
     *
     * @param text
     */
    @JmsListener(destination = "noc_msg2", containerFactory = "myFactory2",subscription="cabbage-pro-listener3")
    public void receiveNocBaicaiTopic(byte[] text) {
        log.info("receive noc_msg2 message: " + new String(text));
    }
}
