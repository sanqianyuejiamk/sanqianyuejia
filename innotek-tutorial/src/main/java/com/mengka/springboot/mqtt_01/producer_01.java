package com.mengka.springboot.mqtt_01;

import com.mengka.springboot.util.TimeUtil;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.*;

import java.util.Date;

/**
 *  MQTT协议：
 *  MQTT（Message Queuing Telemetry Transport，消息队列遥测传输协议），是一种基于发布/订阅（publish/subscribe）模式的“轻量级”通讯协议，
 *  该协议构建于TCP/IP协议上，由IBM在1999年发布。
 *
 *  (官网：http://mqtt.org/)
 *  MQTT is a machine-to-machine (M2M)/"Internet of Things" connectivity protocol.
 *
 *  It was designed as an extremely lightweight publish/subscribe messaging transport.
 *
 *
 *  MQTT最大优点在于，可以以极少的代码和有限的带宽，为连接远程设备提供实时可靠的消息服务。
 *  做为一种低开销、低带宽占用的即时通讯协议，使其在物联网、小型设备、移动应用等方面有较广泛的应用。
 *
 * 》》MQTT协议是为大量计算能力有限，且工作在低带宽、不可靠的网络的远程传感器和控制设备通讯而设计的协议。
 *
 * 》》使用场景
 *  如：机器与机器（M2M）通信和物联网（IoT）
 *
 * @author huangyy
 * @date 2017/10/16.
 */
@Slf4j
public class producer_01 {

    private static MqttClient client;

    public static void main(String[] args) {
        String sendMsg = "Just for test[" + TimeUtil.toDate(new Date(), TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS);
        publish(sendMsg);
    }

    public static void publish(String sendMsg) {
        try {
            client = new MqttClient(Constant.hostname, "producerServer");

            MqttTopic topic = client.getTopic(Constant.publisheTopic);
            log.info("send message: " + sendMsg);

            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(false);
            options.setUserName(Constant.username);
            options.setPassword(Constant.password.toCharArray());
            options.setConnectionTimeout(10);//设置超时时间
            options.setKeepAliveInterval(20);//设置会话心跳时间
            client.connect(options);

            MqttMessage message = new MqttMessage(sendMsg.getBytes());
            message.setQos(1);
            while (true) {
                sendMsg = "Just for test[" + TimeUtil.toDate(new Date(), TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS);
                message.setPayload(sendMsg.getBytes());
                MqttDeliveryToken token = topic.publish(message);
                log.info("publish message topic[{}] , messgae: {}", Constant.publisheTopic, new String(message.getPayload()));

                while (!token.isComplete()) {
                    token.waitForCompletion(1000);
                }
                Thread.sleep(5000);
            }
        } catch (Exception e) {
            log.error("publish error!", e);
        }
    }
}
