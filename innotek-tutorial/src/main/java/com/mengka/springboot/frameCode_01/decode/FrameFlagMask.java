package com.mengka.springboot.frameCode_01.decode;


/**
 * 事件标志过滤常量
 * 
 * @author zhuhy 
 * @version cabbage-pro1.0,2016-12-21
 * @since cabbage-pro1.0  
 *
 */
public class FrameFlagMask 
{
	//道路停车车位类型
	//PARKEVENT
	//事件类型,xxxxx111
	public static int MASK_PE_EVENTTYPE = 0x07;
	//没有事件（用于确认车位状态）,000
	public static int PE_CHECK_IN = 0x00;
	//到达事件,001
	public static int PE_ARRIVAL = 0x01;
	//离开事件,010
	public static int PE_DEPARTURE = 0x02;
	//移动事件,011
	public static int PE_MOVE = 0x03;
	//干预事件,100
	public static int PE_TAMPER = 0x04;
	//车位状态，0：车位空闲；1：车位占用；xxxx1xxx
	public static int MASK_PE_OCCUPIED = 0x08;
	//磁检测状态，0：磁检测异常；1：磁检测正常；xxx1xxxx
	public static int MASK_PE_MAG_GOOD = 0x10;
	//是否首条数据，0：不是首条数据；1：首条数据（说明MCU 刚复位）；xx1xxxxx
	public static int MASK_PE_FIRST = 0x20;
	//是否清零数据，0：不是清零数据；1：清零后首条数据；x1xxxxxx
	public static int MASK_PE_ZEROED = 0x40;
	//抗干扰A 开关状态，0：关闭；1：打开，1xxxxxxx
	public static int MASK_PE_ANTIJAM_A = 0x80;
	
	//道路停车传感器标志位1
	//SensorFlag1
	//抗干扰 B参数 2，0～63；XX111111
	public static int MASK_SF1_ANTIJAM_B_PARA = 0x3F;
	//抗干扰B 0：关闭， ：关闭， 1：抗 1；2：抗 2；3：抗 3；，11xxxxxx
	public static int MASK_SF1_ANTIJAM_B = 0xC0;
	
	//道路停车传感器标志位2
	//SensorFlag2
	//泊位类型,xxxxxxx1
	public static int MASK_SF2_BERTH_TYPE = 0x01;
	//自动清零标志,xxxxxx1x
	public static int MASK_SF2_ZEROED_AUTO = 0x02;
	//车载 标签 开关,xxxxx1xx
	public static int MASK_SF2_SENSORTAG = 0x04;
	//抗干扰 C开关状态,xxxx1xxx
	public static int MASK_SF2_ANTIJAM_C = 0x08;
	//ACK模式,xxx1xxxx
	public static int MASK_SF2_ACK = 0x10;
	//NB传感器，UDP通讯时的备用服务器开关,xx1xxxxx
	public static int MASK_SF2_UDP_BACKUP_SWITCH = 0x20;
	//NB传感器，通讯方式,x1xxxxxx
	public static int MASK_SF2_SERVER_TYPE = 0x40;
	//NB传感器，省电模式,1xxxxxxx
	public static int MASK_SF2_POWER_SAVE = 0x80;
	
	//NB传感器信号
	//ECL
	//信号覆盖等级,xxxxxx11
	public static int MASK_NSE_ECL = 0x03;
	
	
	//传感器车载标签标志位
	//TagVoltageAndFlag
	//低 6位：车载标签 位：车载标签 位：车载标签 1电压 ；BIT7&BIT6：0加速
	//车载标签电压,xx111111
	public static int MASK_TAG_VOLTAGE = 0x3F;
	
	
	//
	//网关心跳标志位
	//Flag
	//	
	//充电中, xxxxxxx1
	public static int MASK_AP_HF_CHARGING = 0x01;
	//刚复位标志位, xxxxxx1x 
	public static int MASK_AP_HF_RESET = 0x02;
	//次服务器开关, xxxxx1xx 
	public static int MASK_AP_HF_BACKUP_SWITCH = 0x04;
	//ACK模式标志位, xxxx1xxx
	public static int MASK_AP_HF_ACK_MODE = 0x08;
	//设备功能类型标志位, xxx1xxxx
	public static int MASK_AP_HF_FUNC_TYPE = 0x10;
	//流量网关标志位, 111xxxxx
	public static int MASK_AP_HF_NETWORK = 0xE0;
	
	
	//
	//转发器心跳标志位
	//Flag
	//	
	//是否在充电, xxxxxxx1
	public static int MASK_ROUTER_HF_CHARGING = 0x01;
	//刚复位标志位, xxxxxx1x 
	public static int MASK_ROUTER_HF_RESET = 0x02;
	//请求时间同步标志位, xxxxx1xx
	public static int MASK_ROUTER_HF_NEED_TIME_SYNC = 0x04;
	
	//标签数据标志位
	//FLAG
	//阅读标签类型，0：驶入阅读标签，1：MOVE阅读标签；xxxxxxx1
	public static int MASK_TAG_FG_ACT_TYPE = 0x01;
	//是否首条标签数据，：0，非首条标签数据；1，首条标签数据；xxxxxx1x
	public static int MASK_TAG_FG_FIRST = 0x02;
	
	//车载标签标志位
	//tagXFLAG
	//是否USB充电中，xxxxxxx1
	public static int MASK_TAG_DFG_USB_CHARGING = 0x01;
	//=========================================================================
	//=========================================================================

	//
	//流量设备标志位
	//Flow Device Flag 
	//
	//发送原始数据， xxxxxxx1
	public static int MASK_FLOW_DF_SEND_ORIGIN_DATA = 0x01;
	//最近1分钟内时间占有率参数有效性,xxxxxx1x
	public static int MASK_FLOW_DF_OCCUPY_NOW_VALID = 0x02;
	//设置时间间隔内，时间占有率参数有效性,xxxxx1xx
	public static int MASK_FLOW_DF_OCCUPY_AVR_VALID = 0x04;
	
	//
	//流量通道标志位
	//Flow Channel Flag
	//
	//通道模式， xxxx1111
	public static int MASK_FLOW_CF_MODEL = 0x0F;
	//绑定通道,1111xxxx
	public static int MASK_FLOW_CF_BIND = 0xF0;
	
	//
	//车位类型标志位
	//Park Event Flag
	//	
	//传感器时间已经同步, xxxxxxx1
	public static int MASK_FLOW_PEF_TIME_SYNC = 0x01;
	//传感器需要进行时间同步, xxxxxx1x
	public static int MASK_FLOW_PEF_NEED_TIME_SYNC = 0x02;
	//车流量状态(有车经过), xxxxx1xx 
	public static int MASK_FLOW_PEF_CAR_PAST = 0x04;
	//长时间有车处理标志(当前出现长时间有车), xxxx1xxx 
	public static int MASK_FLOW_PEF_CAR_LONG_STAYED = 0x08;
	//磁检测状态(磁检测正常),xxx1xxxx 
	public static int MASK_FLOW_PEF_MAG_GOOD = 0x10;
	//首条数据(说明MCU刚复位), xx1xxxxx
	public static int MASK_FLOW_PEF_FIRST = 0x20;
	//清零后首条数据, x1xxxxxx 
	public static int MASK_FLOW_PEF_ZEROED = 0x40;
	//抗干扰开关状态(打开), 1xxxxxxx 
	public static int MASK_FLOW_PEF_ANTIJAM = 0x80;
	



	//
	//Flag masks for traffic flow sensor
	//
	//xxxxxx00
	public static int FLOW_POS_UNSET = 0x00;
	//xxxxxx01
	public static int FLOW_POS_ENTRANCE = 0x01;
	//xxxxxx10
	public static int FLOW_POS_EXIT = 0x02;
	//xxxxxx11
	public static int FLOW_RESERVED = 0x03;
	//xxxxxx1x, Sensor Flag, 0:(A, close to park place) , 1:B
	public static int FLOW_SF_INSTALL_POS = 0x02;

	//
	// Flow event flag  &&  Flow Sensor Flag (FlowSensorCheckPayload)
	//
	//xxxxxx1x, sensor flag2
	public static int AUTO_ZEROED = 0x02;
	//xxxxxxx1, sensor flag2
	public static int BERTH_TYPE = 0x01;
	//xxxxx1xx, 车载标签
	public static int VEHICLE_TAG = 0x04;
	//11XXXXXX, 抗干扰参
	public static int ANTIJAM_B = 0xC0;
	//XX111111, 抗干扰参
	public static int ANTIJAM_B_PARAM = 0x3F;
	

	//Common Bit
	//xxxxxxx1
	public static int BIT0 = 0x01;
	//xxxxxx1x
	public static int BIT1 = 0x02;
	//xxxxx1xx
	public static int BIT2 = 0x04;
	//xxxx1xxx
	public static int BIT3 = 0x08;
}
