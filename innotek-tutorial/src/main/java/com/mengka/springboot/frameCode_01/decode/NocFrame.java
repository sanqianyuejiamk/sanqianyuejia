package com.mengka.springboot.frameCode_01.decode;

import java.nio.ByteBuffer;
import java.util.Date;


/**
 * NOC消息帧，所有网关上传消息帧的父帧
 *
 * @author zhuhy
 * @version cabbage-pro1.0,2016-12-21
 * @since cabbage-pro1.0
 */
public class NocFrame {

    //传感器类型
    protected NocSensorType sensorType;


    //NB传感器帧头
    protected NbFrameHead nbHead = null;


    //帧消息体
    protected NocFrameBody body = null;

    //原始数据
    protected String payload;

    //数据接收时间
    protected Date receiveTime;


    /**
     * 构造函数
     */
    public NocFrame(String payload) {
        this.receiveTime = new Date();
        this.payload = payload;

        ByteBuffer buffer = NocHelper.string2Buffer(payload);

        int deviceType = NocHelper.asUnsignedByte(buffer.get());
        buffer.rewind();

        //获取设备类型
        deviceType = deviceType >> Constants.NUM_FOUR;

        sensorType = NocSensorType.get(deviceType);

        if (sensorType == NocSensorType.RFSENSOR) {

        } else if (sensorType == NocSensorType.NBSENSOR) {
            //读取消息头
            this.nbHead = new NbFrameHead(buffer);

            //根据控制码，读取消息体
            if (FrameCode.FCC_SENSOR_CHECK == nbHead.getCtrlCode()
                    || FrameCode.FCC_SENSOR_HEARTBEAT == nbHead.getCtrlCode()
                    || FrameCode.FCC_SENSOR_DEBUG == nbHead.getCtrlCode()) {
                this.body = new NbSensorDataFrame(buffer, nbHead.getCtrlCode());
            } else if (FrameCode.FCC_SENSOR_TAG == nbHead.getCtrlCode()) {
                this.body = new NbSensorTagFrame(buffer);
            }
        } else if (sensorType == NocSensorType.LRSENSOR) {

        }
    }


    /**
     * NOC上传的传感器类型
     */
    public static enum NocSensorType {
        RFSENSOR(3, "RF传感器"),
        NBSENSOR(6, "NB传感器"),
        LRSENSOR(7, "LR传感器");

        public int key;
        public String value;

        private NocSensorType(int key, String value) {
            this.key = key;
            this.value = value;
        }

        public static NocSensorType get(int key) {
            NocSensorType[] values = NocSensorType.values();
            for (NocSensorType object : values) {
                if (object.key == key) {
                    return object;
                }
            }
            return null;
        }
    }


    /**
     * 获取传感器类型
     *
     * @return
     */
    public NocSensorType getSensorType() {
        return sensorType;
    }


    /**
     * 获取NB传感器消息帧头
     *
     * @return
     */
    public NbFrameHead getNbFrameHead() {
        return nbHead;
    }


    /**
     * 帧消息体
     *
     * @return
     */
    public NocFrameBody getFrameBody() {
        return body;
    }


    /**
     * 原始有效数据
     *
     * @return
     */
    public String getPayload() {
        return payload;
    }


    /**
     * 消息接收时间
     *
     * @return
     */
    public Date getReceiveTime() {
        return receiveTime;
    }
}
