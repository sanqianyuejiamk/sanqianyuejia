package com.mengka.springboot.config;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.ActiveMQPrefetchPolicy;
import org.apache.activemq.RedeliveryPolicy;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTopic;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.connection.CachingConnectionFactory;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.listener.DefaultMessageListenerContainer;
import org.springframework.jms.support.converter.MappingJackson2MessageConverter;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.jms.support.converter.MessageType;
import org.springframework.jms.support.converter.SimpleMessageConverter;
import org.springframework.jms.support.destination.BeanFactoryDestinationResolver;

import javax.jms.ConnectionFactory;
import javax.jms.Queue;
import javax.jms.Topic;

/**
 * @author huangyy
 * @date 2017/10/18.
 */
@Configuration
public class AppConfig {

    private static final String CONNECT_CLIENT_ID = "cabbage-mk-pro2";

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
        return new ActiveMQTopic("nb_msg_dn");
    }

    protected ActiveMQPrefetchPolicy prefetchPolicy(){
        int prefetchValue = 1000;

        ActiveMQPrefetchPolicy prefetchPolicy = new ActiveMQPrefetchPolicy();
        prefetchPolicy.setQueuePrefetch(prefetchValue);
        return prefetchPolicy;
    }

    @Bean
    public ActiveMQConnectionFactory connectionFactory() {
        RedeliveryPolicy redeliveryPolicy = new RedeliveryPolicy();
        redeliveryPolicy.setInitialRedeliveryDelay(1000L);
        redeliveryPolicy.setRedeliveryDelay(1000L);
        redeliveryPolicy.setMaximumRedeliveries(6);
        redeliveryPolicy.setUseExponentialBackOff(true);
        redeliveryPolicy.setBackOffMultiplier(5);
        //此链接信息可放入配置文件中
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("cabbage", "cabbage@innotek", "tcp://192.168.10.219:61616");
//        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        connectionFactory.setClientID(CONNECT_CLIENT_ID);
        connectionFactory.setPrefetchPolicy(prefetchPolicy());
        connectionFactory.setRedeliveryPolicy(redeliveryPolicy);
        return connectionFactory;
    }

    @Bean(name="cachingConnectionFactory")
    public CachingConnectionFactory cachingConnectionFactory(@Qualifier("connectionFactory")ActiveMQConnectionFactory connectionFactory) {
        CachingConnectionFactory cachingConnectionFactory = new CachingConnectionFactory(connectionFactory);
//        cachingConnectionFactory.setCacheConsumers(Boolean.FALSE);
        cachingConnectionFactory.setSessionCacheSize(10);
        cachingConnectionFactory.setClientId(CONNECT_CLIENT_ID);
        return cachingConnectionFactory;
    }

    @Bean
    public ActiveMQConnectionFactory connectionFactory2() {
        //此链接信息可放入配置文件中
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("cabbage", "cabbage@innotek", "tcp://192.168.10.219:61616");
//        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        connectionFactory.setClientID("cabbage-mk-pro3");
        return connectionFactory;
    }

    @Bean
    public ActiveMQConnectionFactory connectionFactory4() {
        //此链接信息可放入配置文件中
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("cabbage", "cabbage@innotek", "tcp://192.168.10.219:61616");
//        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        connectionFactory.setClientID("cabbage-mk-pro4");
        return connectionFactory;
    }

    @Bean
    public ActiveMQConnectionFactory connectionFactory5() {
        //此链接信息可放入配置文件中
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("cabbage", "cabbage@innotek", "tcp://192.168.10.219:61616");
//        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        connectionFactory.setClientID("cabbage-mk-pro5");
        return connectionFactory;
    }

    @Bean
    public JmsMessagingTemplate jmsMessagingTemplate(ActiveMQConnectionFactory connectionFactory2) {
        return new JmsMessagingTemplate(connectionFactory2);
    }

    /**
     *  https://stackoverflow.com/questions/40960023/springboot-jms-listener-activemq-is-very-slow
     *
     * @param cachingConnectionFactory
     * @return
     */
    @Bean
    public JmsListenerContainerFactory myFactory(@Qualifier("cachingConnectionFactory")CachingConnectionFactory cachingConnectionFactory) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        factory.setConnectionFactory(cachingConnectionFactory);
        factory.setPubSubDomain(true);//topic模式
        factory.setClientId(CONNECT_CLIENT_ID);
        factory.setSubscriptionDurable(true);//destination-type="durableTopic"，可持久的topic
        factory.setReceiveTimeout(5000L);
//        factory.setMaxMessagesPerTask(1);
        factory.setConcurrency("1");
//        factory.setSessionTransacted(Boolean.TRUE);
        factory.setCacheLevel(DefaultMessageListenerContainer.CACHE_AUTO);
        return factory;
    }

//    @Bean
//    public JmsListenerContainerFactory<?> myFactory(ConnectionFactory connectionFactory,
//                                                    DefaultJmsListenerContainerFactoryConfigurer configurer) {
//        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
//        // This provides all boot's default to this factory, including the message converter
//        configurer.configure(factory, connectionFactory);
//
//        factory.setPubSubDomain(true);//topic模式
//        factory.setClientId("cabbage-pro-listener2");
//        factory.setSubscriptionDurable(true);//destination-type="durableTopic"，可持久的topic
//        factory.setConcurrency("1");
////        factory.setCacheLevel(CACHE_CONSUMER);
//        factory.setReceiveTimeout(5000L);
////        factory.setDestinationResolver(new BeanFactoryDestinationResolver(beanFactory));
//        return factory;
//    }

    @Bean
    public JmsListenerContainerFactory<?> myFactory2(ConnectionFactory connectionFactory4,
                                                    DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        configurer.configure(factory, connectionFactory4);
        // You could still override some of Boot's default if necessary.
        factory.setPubSubDomain(true);//topic模式
        factory.setClientId("cabbage-pro-listener3");
        factory.setSubscriptionDurable(true);//destination-type="durableTopic"，可持久的topic
        return factory;
    }

    @Bean
    public JmsListenerContainerFactory<?> defaultContainerFactory(ConnectionFactory connectionFactory5,
                                                                  DefaultJmsListenerContainerFactoryConfigurer configurer) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        // This provides all boot's default to this factory, including the message converter
        configurer.configure(factory, connectionFactory5);
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
