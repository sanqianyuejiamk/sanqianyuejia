package com.mengka.springboot.config;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTopic;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.support.converter.MappingJackson2MessageConverter;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.jms.support.converter.MessageType;
import org.springframework.jms.support.converter.SimpleMessageConverter;

import javax.jms.ConnectionFactory;
import javax.jms.Queue;
import javax.jms.Topic;

/**
 * @author huangyy
 * @date 2017/10/18.
 */
@Configuration
public class AppConfig {

    @Bean
    public Queue queue() {
        return new ActiveMQQueue("sample.queue");
    }

    @Bean
    public Topic topic() {
        return new ActiveMQTopic("noc_msg1");
    }

    @Bean
    public Topic baicaiTopic() {
        return new ActiveMQTopic("noc_msg2");
    }

    @Bean
    public ActiveMQConnectionFactory connectionFactory() {
        //此链接信息可放入配置文件中
//        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("cabbage", "cabbage@innotek", "tcp://192.168.10.219:61616");
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        connectionFactory.setClientID("cabbage-mk-pro2");
        return connectionFactory;
    }

    @Bean
    public ActiveMQConnectionFactory connectionFactory2() {
        //此链接信息可放入配置文件中
//        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("cabbage", "cabbage@innotek", "tcp://192.168.10.219:61616");
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        connectionFactory.setClientID("cabbage-mk-pro3");
        return connectionFactory;
    }

    @Bean
    public JmsMessagingTemplate jmsMessagingTemplate(ActiveMQConnectionFactory connectionFactory2) {
        return new JmsMessagingTemplate(connectionFactory2);
    }

    @Bean
    public JmsListenerContainerFactory<?> myFactory(ConnectionFactory connectionFactory,
                                                    DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        configurer.configure(factory, connectionFactory);
        // You could still override some of Boot's default if necessary.
        factory.setPubSubDomain(true);//topic模式
        factory.setClientId("cabbage-pro-listener2");
        factory.setSubscriptionDurable(true);//destination-type="durableTopic"，可持久的topic
        return factory;
    }

    @Bean
    public JmsListenerContainerFactory<?> defaultContainerFactory(ConnectionFactory connectionFactory,
                                                                  DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        configurer.configure(factory, connectionFactory);
        // You could still override some of Boot's default if necessary.
        factory.setPubSubDomain(false);//队列模式
        return factory;
    }

    /**
     *  Serialize message content to json using TextMessage
     *
     * @return
     */
    @Bean
    public MessageConverter jacksonJmsMessageConverter() {
//        MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
//        converter.setTargetType(MessageType.TEXT);
//        converter.setTypeIdPropertyName("_type");
//        return converter;

        SimpleMessageConverter simpleMessageConverter = new SimpleMessageConverter();
        return simpleMessageConverter;
    }
}
