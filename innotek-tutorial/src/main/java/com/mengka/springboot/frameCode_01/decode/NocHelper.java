package com.mengka.springboot.frameCode_01.decode;

import java.nio.ByteBuffer;
import java.util.Calendar;
import java.util.Date;
import java.util.Formatter;

/**
 * 
 * NOC消息解析工具类
 * 
 * @author zhuhy 
 * @version cabbage-pro1.0,2016-12-21
 * @since cabbage-pro1.0 
 */
public class NocHelper 
{
	//NOC上传年份基数
	private final static int BASE_YEAR = 2000;
	//传感器最小电池电压
	private final static float SENSOR_VOLTAGE_MIN = 3.3f;
	//传感器最大电池电压
	private final static float SENSOR_VOLTAGE_MAX = 3.6f;
	//网关转发器最小电池电压
	private final static float VOLTAGE_BATTERY_MIN = 3.0f;
	//网关转发器最大电池电压
	private final static float VOLTAGE_BATTERY_MAX = 4.2f;
	//网关转发器错误电池电压
	private final static float VOLTAGE_BATTERY_EXT = 5.55f;
	//车载标签最小电池电压
	private final static float TAG_VOLTAGE_MIN = 3.0f;
	//车载标签最大电池电压
	private final static float TAG_VOLTAGE_MAX = 4.2f;
	
	
	/**
	 * 字符串转换为字节数组
	 * 
	 * @param source
	 * @return
	 */
	public static ByteBuffer string2Buffer(String source) 
	{
		ByteBuffer buffer = ByteBuffer.allocate(source.length() / 2);
		for (int idx = 0; idx < buffer.capacity(); idx++) 
		{
			int byteValue = Integer.parseInt(
					source.substring(idx * 2, idx * 2 + 2), 16);
			buffer.put((byte) byteValue);
		}
		buffer.position(0);
		return buffer;
	}
	
	
	/**
	 * 年月日转换为日期
	 * 
	 * @param year
	 * @param month
	 * @param day
	 * @return
	 */
	public static Date toDate(int year, int month, int day) 
	{
		Calendar time = Calendar.getInstance();
		time.clear();
		time.set(Calendar.YEAR, year + BASE_YEAR); 
		time.set(Calendar.MONTH, month - Constants.NUM_ONE);
		time.set(Calendar.DAY_OF_MONTH, day);
		return time.getTime();
	}

	/**
	 * 转换为日期
	 * 
	 * @param year
	 * @param month
	 * @param day
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static Date toDate(int year, int month, int day, 
			int hour, int minute, int second) 
	{
		Calendar time = Calendar.getInstance();
		time.clear();
		time.set(Calendar.YEAR, year + BASE_YEAR); 
		time.set(Calendar.MONTH, month - Constants.NUM_ONE);
		time.set(Calendar.DAY_OF_MONTH, day);
		time.set(Calendar.HOUR, hour);
		time.set(Calendar.MINUTE, minute);
		time.set(Calendar.SECOND, second);
		return time.getTime();
	}
	
	
	/**
	 * 转换为日期（从GMT时间到当前操作系统所在时区时间）
	 * 
	 * @param year
	 * @param month
	 * @param day
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static Date toDateFromGMT(int year, int month, int day, 
			int hour, int minute, int second) 
	{
		Calendar time = Calendar.getInstance();
		time.clear();
		time.set(Calendar.YEAR, year + BASE_YEAR); 
		time.set(Calendar.MONTH, month - Constants.NUM_ONE);
		time.set(Calendar.DAY_OF_MONTH, day);
		time.set(Calendar.HOUR, hour);
		time.set(Calendar.MINUTE, minute);
		time.set(Calendar.SECOND, second);
		
		return new Date(time.getTimeInMillis() 
				+ time.getTimeZone().getRawOffset());
	}
	
	
	/**
	 * 将字节数组转换为HEX字符串
	 * @param data
	 * @return
	 */
	public static String toPrintHexString(byte[] data)
	{
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<data.length; i++)
		{
			String hex = Integer.toHexString(data[i] & 0xFF);
			if(hex.length() == 1)
			{
				hex = "0" + hex;
			}
			sb.append(hex.toUpperCase());
			sb.append(" ");
		}
		
		return sb.toString();
	}
	
	public static String byteArray2Hex(final byte[] bytes) 
	{
		@SuppressWarnings("resource")
		Formatter formatter = new Formatter();
		for (byte b : bytes) {
			formatter.format("%02X", b);
		}
		return formatter.toString();
	}
	
	
	/**
	 * 将字节数组转换为HEX字符串
	 * @param data
	 * @return
	 */
	public static String toPrintHexString(byte[] data, int start, int len)
	{
		StringBuilder sb = new StringBuilder();
		for(int i=start; i<len; i++)
		{
			String hex = Integer.toHexString(data[i] & 0xFF);
			if(hex.length() == 1)
			{
				hex = "0" + hex;
			}
			sb.append(hex.toUpperCase());
			sb.append(" ");
		}
		
		return sb.toString();
	}
	
	
	/**
	 * 将字节数组转换为HEX字符串
	 * @param data
	 * @return
	 */
	public static String toHexString(byte[] data, int start, int len)
	{
		StringBuilder sb = new StringBuilder();
		for(int i=start; i<len; i++)
		{
			String hex = Integer.toHexString(data[i] & 0xFF);
			if(hex.length() == 1)
			{
				hex = "0" + hex;
			}
			sb.append(hex);
		}
		
		return sb.toString();
	}
	
	/**
	 * 将字节数组转换为大写HEX字符串
	 * @param data
	 * @return
	 */
	public static String toUpperCaseHexString(byte[] data, int start, int len)
	{
		return toHexString(data,start,len).toUpperCase();
	}
	
	/**
	 * 将字节数组转换为HEX字符串
	 * @param data
	 * @return
	 */
	public static String toHexString(byte[] data)
	{
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<data.length; i++)
		{
			String hex = Integer.toHexString(data[i] & 0xFF);
			if(hex.length() == 1)
			{
				hex = "0" + hex;
			}
			sb.append(hex);
		}
		
		return sb.toString();
	}
	
	/**
	 * 将字节数组转换为大写HEX字符串
	 * @param data
	 * @return
	 */
	public static String toUpperCaseHexString(byte[] data)
	{
		return toHexString(data).toUpperCase();
	}
	
	
	/**
	 * 将字节数组转换为HEX字符串
	 * @param data
	 * @return
	 */
	public static String toOneHexString(byte[] data)
	{
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<data.length; i++)
		{
			String hex = Integer.toHexString(data[i] & 0xF);
			sb.append(hex);
		}
		
		return sb.toString();
	}
	
	

	
	/**
	 * 16进制字符串转换为字节数组
	 * @param hexString
	 * @return
	 */
	public static byte[] toBytes(String hexString) 
	{   
	    if(null == hexString || "".equals(hexString)) 
	    {   
	        return null;   
	    }     
	    
	    int length = hexString.length() / 2;  
	    
	    byte[] result = new byte[length];  
	    
	    for (int i = 0; i < length; i++) 
	    {   
	        int pos = i * 2;   
	        
	        result[i] = (byte)Integer.parseInt(hexString.substring(pos, pos+2), 16);
	    }   
	    return result;   
	}  
	
	
	/**
	 * 将长整形数据转换为字节
	 * @param data
	 * @return
	 */
	public static byte[] toBytes(long data) 
	{
		byte[] result = new byte[4];
		
		long temp = data;
		for(int i=result.length-1; i>=0; i--)
		{
			result[i] = new Long(temp & 0xff).byteValue();
			temp = temp >> 8;
		}
		return result;
	}	
	
	/**
	 * 将整形数据转换为字节
	 * @param data
	 * @return
	 */
	public static byte[] toBytes(int data) 
	{
		byte[] result = new byte[2];
		
		long temp = data;
		for(int i=result.length-1; i>=0; i--)
		{
			result[i] = new Long(temp & 0xff).byteValue();
			temp = temp >> 8;
		}
		return result;
	}	
	
	
	/**
	 * 长整型转换为字节数据
	 * 大端模式
	 * @param data
	 * @param result
	 * @param startIndex
	 * @param len
	 */
	public static void convertToBytes(long data, byte[] result, 
			int startIndex, int len)
	{
		long temp = data;
		for(int i=1; i<=len; i++)
		{
			//result[startIndex+i] = new Long(temp & 0xff).byteValue();
			result[startIndex+len-i] = new Long(temp & 0xff).byteValue();
			temp = temp >> 8;
		}
	}
	
	
	/**
	 * 格式化字符串
	 * @param format
	 * @param args
	 * @return
	 */
	public static String formatString(String format, Object... args)
	{
		@SuppressWarnings("resource")
		Formatter formatter = new Formatter();
		return formatter.format(format, args).toString();
	}
	
	
	/**
	 * 将数据转换为软件版本号
	 * 例如0x11表示1.01，最大可表示15.15
	 * @param data
	 * @return
	 */
	public static String getFormatVersion(int data) 
	{
    	String version = String.valueOf((data&0xf0) >> 4);
    	
    	String subVersion = String.valueOf(data & 0x0f);
    	if(subVersion.length() < 2)
    	{
    		subVersion = "0" + subVersion;
    	}
    	version = version + "." + subVersion;
    	
    	return version;
	}
	
	/**
	 * 将地址转换为8位16进制,字母大写
	 * @return
	 */
	public static String getFormatAddress(long address) 
	{
		return formatString("%08X", address);
	}
	
	
	/**
	 * 将地址转换为8位16进制，字母小写
	 * @param data
	 * @return
	 */
	public static String getFormatMacAddr(long data) 
	{
		return formatString("%08x", data);
	}
	
	
	/**
	 * 获取实际网关、转发器电池电压
	 * @param voltageBattery
	 * @return
	 */
	public static float getRealVoltageBattery(int voltageBattery)
	{
		float vol = (voltageBattery + 300)/100.0f; 
		if(vol == VOLTAGE_BATTERY_EXT)
		{
			vol = VOLTAGE_BATTERY_MIN;
		}
		else if(vol > VOLTAGE_BATTERY_MAX && vol < VOLTAGE_BATTERY_EXT)
		{
			vol = VOLTAGE_BATTERY_MAX;
		}
		else if(vol < VOLTAGE_BATTERY_MIN)
		{
			vol = VOLTAGE_BATTERY_MIN;
		}
		
		return vol;
	}
	
	
	/**
	 * 获取实际传感器电池电压
	 * @return
	 */
	public static float getRealSensorVoltage(int voltage)
	{
		Float vol = (voltage + 300)/100.0f; 
		
		if(vol < SENSOR_VOLTAGE_MIN)
		{
			vol = SENSOR_VOLTAGE_MIN;
		}
		else if(vol > SENSOR_VOLTAGE_MAX)
		{
			vol = SENSOR_VOLTAGE_MAX;
		}
		
		return vol;
	}
	
	
	/**
	 * 获取实际车载标签电池电压
	 * 
	 * @param voltage
	 * @return
	 */
	public static float getRealTagVoltage(int voltage)
	{
		//电池电压，0-120 表示 3.00-4.20V
		Float vol = (voltage + 300)/100.0f; 
		
		if(vol < TAG_VOLTAGE_MIN)
		{
			vol = TAG_VOLTAGE_MIN;
		}
		else if(vol > TAG_VOLTAGE_MAX)
		{
			vol = TAG_VOLTAGE_MAX;
		}
		
		return vol;
	}
	
	
	/**
	 * 获取实际充电电压
	 * @param voltageCharge
	 * @return
	 */
	public static float getRealVoltageCharge(int voltageCharge)
	{
		return voltageCharge/10.0f;
	}
	
	/**
	 * 将NETIN数组转换为字符串
	 * @param netIn
	 * @return
	 */
	public static String getFormatNetIn(int[] netIn)
	{
		StringBuilder result = new StringBuilder();
		for(int i=0; i < netIn.length; i++)
		{
			if(0 != i)
			{
				result.append(",");
			}
			result.append(netIn[i]);
		}
		return result.toString();
	}


	/**
	 * 将有符号byte类型数据转换为无符号数
	 * 
	 * @param data
	 * @return
	 */
	public static int asUnsignedByte(byte data) 
	{
		return data & 0x0FF;
	}

	/**
	 * 将有符号short类型数据转换为无符号数
	 * 
	 * @param data
	 * @return
	 */
	public static int asUnsignedShort(short data) 
	{
		return data & 0x0FFFF;
	}

	/**
	 * 将有符号int类型数据转换为无符号数
	 * 
	 * @param data
	 * @return
	 */
	public static long asUnsignedInt(int data) 
	{
		return data & 0x0FFFFFFFFl;
	}


	/**
	 * 将ASCII码数组转换为字符串
	 * 
	 * @param data
	 * @return
	 */
	public static String asciiToString(int[] data) 
	{
		StringBuilder sb = new StringBuilder(data.length);
		for (int i = 0; i < data.length; ++i) 
		{
			if (data[i] < 0) 
			{
				throw new IllegalArgumentException();
			}
			sb.append((char) data[i]);
		}
		return sb.toString();
	}
	
	
	/**
	 * 将ASCII码数组转换为字符串
	 * 
	 * @param data
	 * @return
	 */
	public static String asciiToString(byte[] data) 
	{
		StringBuilder sb = new StringBuilder(data.length);
		for (int i = 0; i < data.length; ++i) 
		{
			if (data[i] < 0) 
			{
				throw new IllegalArgumentException();
			}
			sb.append((char) data[i]);
		}
		return sb.toString();
	}
}
