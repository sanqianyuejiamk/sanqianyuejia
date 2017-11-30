package com.mengka.springboot.coap_01;

import lombok.Getter;

/**
 * CoAP采用与HTTP协议相同的请求响应工作模式
 *
 * CoAP协议共有4中不同的消息类型
 * 1.CON——需要被确认的请求，如果CON请求被发送，那么对方必须做出响应。
 * 2.NON——不需要被确认的请求，如果NON请求被发送，那么对方不必做出回应。
 * 3.ACK——应答消息，接受到CON消息的响应。
 * 4.RST——复位消息，当接收者接受到的消息包含一个错误，接受者解析消息或者不再关心发送者发送的内容，那么复位消息将会被发送。
 *
 * @author huangyy
 * @date 2017/11/20.
 */
public enum CoAPTypeEnum {

    CON("CON", "需要被确认的请求"),
    NON("NON", "不需要被确认的请求"),
    ACK("ACK", "应答消息，接受到CON消息的响应"),
    RST("RST", "复位消息");

    @Getter
    private String type;

    @Getter
    private String desc;

    CoAPTypeEnum(String type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public static CoAPTypeEnum valueOfTypeId(String type) {
        for (CoAPTypeEnum typeEnum : values()) {
            if (typeEnum.getType().equals(type)) {
                return typeEnum;
            }
        }
        return null;
    }
}
