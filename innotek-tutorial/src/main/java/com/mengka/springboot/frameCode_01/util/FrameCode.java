package com.mengka.springboot.frameCode_01.util;

/**
 * 通讯协议控制码
 *
 * @author ZHY
 * @version MsgCollect1.0, 2016/6/7
 * @since MsgCollect1.0
 */
public class FrameCode {
    //起始字节
    public static byte FC_START = 0x7B;
    //结束字节
    public static byte FC_END = 0x7D;
    //隐藏字节
    public static byte FC_ESCAPE = 0x40;
    //
    public static byte FC_CTRL_TIME = (byte) 0xC5;
    //响应设备类型
    public static byte FC_ACK_DEVICE_TYPE = 0x50;


    //===========流量检测命令控制码START=============
    //流量传感器检测帧
    public static byte FC_CTRL_FLOW_SENSOR_CHECK = 0x1B;
    //车流量运算帧
    public static byte FC_CTRL_FLOW_CALCULATE = 0x1C;
    //主设备属性
    public static byte FC_CTRL_FLOW_DEVICE_PROPERTY = 0x1D;
    //===========流量检测命令控制码END=============

    //===========道路检测命令控制码START=============
    //传感器检测帧
    public static byte FC_CTRL_SENSOR_CHECK = 0x10;
    //传感器心跳帧
    public static byte FC_CTRL_SENSOR_HEART = 0x11;
    //传感器调试帧
    public static byte FC_CTRL_SENSOR_DEBUG = 0x12;
    //传感器标签帧
    public static byte FC_CTRL_SENSOR_TAG = 0x13;
    //===========道路检测END=============

    //转换器心跳1
    public static byte FC_CTRL_ROUTER_HEART1 = 0x20;
    //转换器心跳2
    public static byte FC_CTRL_ROUTER_HEART2 = 0x24;


    //网关（接入点）心跳1
    public static byte FC_CTRL_AP_HEART1 = 0x30;
    //网关（接入点）心跳2
    public static byte FC_CTRL_AP_HEART2 = 0x32;


    //===========操作码START=============
    //读操作
    public static byte FC_OP_READ = 0x55;
    //读响应操作
    public static byte FC_OP_READ_RES = (byte) 0xAA;
    //写操作
    public static byte FC_OP_WRITE = (byte) 0xE6;
    //写响应操作
    public static byte FC_OP_WRITE_RES = 0x66;
    //正确应答
    public static byte FC_OP_ACK = (byte) 0x88;
    //===========操作码END=============

}
