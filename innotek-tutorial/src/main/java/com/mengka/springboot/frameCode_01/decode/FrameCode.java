package com.mengka.springboot.frameCode_01.decode;


/**
 * 通讯协议控制码
 * 
 * @author zhuhy 
 * @version cabbage-pro1.0,2016-12-21
 * @since cabbage-pro1.0  
 */
public class FrameCode 
{

	//===========转发器和网关心跳命令控制码START=============
	//传感器检测帧
	public static byte FCC_ROUTER_HEARTBEAT_1 = 0x20;
	//传感器心跳帧
	public static byte FCC_ROUTER_HEARTBEAT_2 = 0x24;
	//传感器调试帧
	public static byte FCC_AP_HEARTBEAT_1 = 0x30;	
	//传感器标签帧
	public static byte FCC_AP_HEARTBEAT_2 = 0x32;	
	//===========转发器和网关心跳命令控制码END=============
	//===========道路检测命令控制码START=============
	//传感器检测帧
	public static byte FCC_SENSOR_CHECK = 0x10;
	//传感器心跳帧
	public static byte FCC_SENSOR_HEARTBEAT = 0x11;
	//传感器调试帧
	public static byte FCC_SENSOR_DEBUG = 0x12;	
	//传感器标签帧
	public static byte FCC_SENSOR_TAG = 0x13;	
	//===========道路检测END=============	
	//===========流量检测命令控制码START=============
	//流量传感器检测帧
	public static byte FCC_FLOW_SENSOR_CHECK = 0x1B;
	//车流量运算帧
	public static byte FCC_FLOW_CALCULATE = 0x1C;
	//主设备属性
	public static byte FCC_FLOW_DEVICE_PROPERTY = 0x1D;	
	//===========流量检测命令控制码END=============


	//
	public static byte FCC_TIME = (byte)0xC5;
	//响应设备类型
	public static byte FC_ACK_DEVICE_TYPE = 0x50;
	
	//帧类型，基本都是01，因为无协议文档不知道什么含义，时钟同步时设置为这个值
	public static byte FC_NORMAL_FRAME_TYPE = 0x01;
	//===========操作码START=============
	//读操作
	public static byte FC_OP_READ = 0x55;
	//读响应操作
	public static byte FC_OP_READ_RES = (byte)0xAA;
	//写操作
	public static byte FC_OP_WRITE = (byte)0xE6;
	//写响应操作
	public static byte FC_OP_WRITE_RES = 0x66;
	//正确应答
	public static byte FC_OP_ACK = (byte)0x88;
	//===========操作码END=============
}
