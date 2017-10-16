package com.mengka.springboot.mqtt_01;

import lombok.extern.slf4j.Slf4j;
import org.eclipse.paho.client.mqttv3.*;

/**
 *  Apache Apollo
 *  http://activemq.apache.org/apollo/download.html
 *
 * 》》github代码：
 *  https://github.com/mqtt/mqtt.github.io/wiki/software?id=software
 *
 * 》》下载：
 * http://mirrors.tuna.tsinghua.edu.cn/apache/activemq/activemq-apollo/1.7.1/apache-apollo-1.7.1-unix-distro.tar.gz
 *
 * 》》启动apollo broker：
 *  /Users/hyy044101331/java_tools/apache-apollo-1.7.1/bin/mybroker/bin
 *  ./apollo-broker run
 *
 * 》》控制台：
 *  http://127.0.0.1:61680/console/index.html
 *
 * @author huangyy
 * @date 2017/10/16.
 */
@Slf4j
public class consumer_01 {

    private static MqttClient client;

    public static void main(String[] args) {
        subscribe();
    }

    public static String subscribe() {
        try {
            //创建MqttClient
            client = new MqttClient(Constant.hostname, "consumerServer1");
            client.setCallback(new MqttCallback() {
                public void connectionLost(Throwable throwable) {
                    log.info("-----connectionLost-----");
                }

                public void messageArrived(String s, MqttMessage mqttMessage) throws Exception {
                    try {
                        log.info("receive message: " + mqttMessage.toString());
                    } catch (Exception e) {
                        log.error("receive message error!",e);
                    }
                }

                public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
                    log.info("-----deliveryComplete-----");
                }
            });
            MqttConnectOptions options = new MqttConnectOptions();
            options.setUserName(Constant.username);
            options.setPassword(Constant.password.toCharArray());
            options.setCleanSession(false);
            options.setConnectionTimeout(10);//设置超时时间
            options.setKeepAliveInterval(20);//设置会话心跳时间
            client.connect(options);

            client.subscribe(Constant.subscribeTopic, 1);

            boolean isSuccess = client.isConnected();
            log.info("isConnected:" + isSuccess);

            //client.disconnect();
        } catch (Exception e) {
            log.info("subscribe error!", e);
            return "failed";
        }
        return "success";
    }
}
