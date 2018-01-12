/** 
 * Project Name:cabbage 
 * File Name:ParkRecord.java 
 * Package Name:com.innotek.cabbage.entity.stat 
 * Date:2016年11月16日下午4:12:43 
 * Copyright (c) 2004-2016 All Rights Reserved. 
 * 
 */
package com.innotek.cabbage.entity.stat;

import java.io.Serializable;
import java.util.Date;

/** 
 * 当前停车记录实体类
 * stat_park_record表实体类
 * 
 * @author panyp 
 * @version cabbage1.0,2016-11-16
 * @since cabbage1.0 
 */
public class ParkRecord implements Serializable 
{
	/**  **/
	private static final long serialVersionUID = -6773925053859456027L;

	//主键id
	private String id;
	//所属城市
	private Integer cityCode;
	//所属区域
	private Integer regionCode;
	//停车点id
	private String parkId;
	//泊位号
	private String berthCode;
	//驶入时间
	private Date arrivalTime;
	//驶入数据来源（1：自动；2：手动）
	private Integer arrivalFrom;
	//驶入可信度，单位为%（100：CHECKIN和自动驶入、手动驶入可信度；80：MOVE可信度；50：心跳可信度）
	private Integer arrivalConfidence;
	//驶离时间
	private Date departureTime;
	//驶离数据来源（1：自动；2：手动）
	private Integer departureFrom;
	//驶离可信度，单位为%（100：CHECKIN和自动驶离、手动驶离可信度；80：MOVE可信度；50：心跳可信度）
	private Integer departureConfidence;
	//停车时长
	private Integer parkingTime;
	//创建时间
	private Date createTime;
	
	//城市名称
	private String cityName;
	//区域名称
	private String regionName;
	//停车点名称
	private String parkName;
	//停车记录条数
	private Integer recordCnt;
	//当前车位状态
	private Integer recordType;
	//停车时长转换
	private String parkingTimeFormat;
	
	/**
	 * @return id
	 */
	public String getId()
	{
		return id;
	}
	/** 
	 * @param id
	 */
	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * @return cityCode
	 */
	public Integer getCityCode() 
	{
		return cityCode;
	}
	/** 
	 * @param cityCode
	 */
	public void setCityCode(Integer cityCode)
	{
		this.cityCode = cityCode;
	}
	/**
	 * @return regionCode
	 */
	public Integer getRegionCode()
	{
		return regionCode;
	}
	/** 
	 * @param regionCode
	 */
	public void setRegionCode(Integer regionCode) 
	{
		this.regionCode = regionCode;
	}
	/**
	 * @return parkId
	 */
	public String getParkId()
	{
		return parkId;
	}
	/** 
	 * @param parkId
	 */
	public void setParkId(String parkId)
	{
		this.parkId = parkId;
	}
	/**
	 * @return berthCode
	 */
	public String getBerthCode()
	{
		return berthCode;
	}
	/** 
	 * @param berthCode
	 */
	public void setBerthCode(String berthCode) 
	{
		this.berthCode = berthCode;
	}
	/**
	 * @return arrivalTime
	 */
	public Date getArrivalTime()
	{
		return arrivalTime;
	}
	/** 
	 * @param arrivalTime
	 */
	public void setArrivalTime(Date arrivalTime) 
	{
		this.arrivalTime = arrivalTime;
	}
	/**
	 * @return arrivalFrom
	 */
	public Integer getArrivalFrom() 
	{
		return arrivalFrom;
	}
	/** 
	 * @param arrivalFrom
	 */
	public void setArrivalFrom(Integer arrivalFrom)
	{
		this.arrivalFrom = arrivalFrom;
	}
	/**
	 * @return arrivalConfidence
	 */
	public Integer getArrivalConfidence() 
	{
		return arrivalConfidence;
	}
	/** 
	 * @param arrivalConfidence
	 */
	public void setArrivalConfidence(Integer arrivalConfidence) 
	{
		this.arrivalConfidence = arrivalConfidence;
	}
	/**
	 * @return departureTime
	 */
	public Date getDepartureTime()
	{
		return departureTime;
	}
	/** 
	 * @param departureTime
	 */
	public void setDepartureTime(Date departureTime) 
	{
		this.departureTime = departureTime;
	}
	/**
	 * @return departureFrom
	 */
	public Integer getDepartureFrom()
	{
		return departureFrom;
	}
	/** 
	 * @param departureFrom
	 */
	public void setDepartureFrom(Integer departureFrom)
	{
		this.departureFrom = departureFrom;
	}
	/**
	 * @return departureConfidence
	 */
	public Integer getDepartureConfidence() 
	{
		return departureConfidence;
	}
	/** 
	 * @param departureConfidence
	 */
	public void setDepartureConfidence(Integer departureConfidence) 
	{
		this.departureConfidence = departureConfidence;
	}
	/**
	 * @return parkingTime
	 */
	public Integer getParkingTime()
	{
		return parkingTime;
	}
	/** 
	 * @param parkingTime
	 */
	public void setParkingTime(Integer parkingTime)
	{
		this.parkingTime = parkingTime;
	}
	/**
	 * @return createTime
	 */
	public Date getCreateTime() 
	{
		return createTime;
	}
	/** 
	 * @param createTime
	 */
	public void setCreateTime(Date createTime) 
	{
		this.createTime = createTime;
	}
	/**
	 * @return cityName
	 */
	public String getCityName() 
	{
		return cityName;
	}
	/** 
	 * @param cityName
	 */
	public void setCityName(String cityName)
	{
		this.cityName = cityName;
	}
	/**
	 * @return regionName
	 */
	public String getRegionName()
	{
		return regionName;
	}
	/** 
	 * @param regionName
	 */
	public void setRegionName(String regionName) 
	{
		this.regionName = regionName;
	}
	/**
	 * @return parkName
	 */
	public String getParkName() 
	{
		return parkName;
	}
	/** 
	 * @param parkName
	 */
	public void setParkName(String parkName) 
	{
		this.parkName = parkName;
	}
	/**
	 * @return recordCnt
	 */
	public Integer getRecordCnt() 
	{
		return recordCnt;
	}
	/** 
	 * @param recordCnt
	 */
	public void setRecordCnt(Integer recordCnt) 
	{
		this.recordCnt = recordCnt;
	}
	/**
	 * @return recordType
	 */
	public Integer getRecordType() 
	{
		return recordType;
	}
	/** 
	 * @param recordType
	 */
	public void setRecordType(Integer recordType) 
	{
		this.recordType = recordType;
	}
	/**
	 * @return parkingTimeFormat
	 */
	public String getParkingTimeFormat() 
	{
		return parkingTimeFormat;
	}
	/** 
	 * @param parkingTimeFormat
	 */
	public void setParkingTimeFormat(String parkingTimeFormat)
	{
		this.parkingTimeFormat = parkingTimeFormat;
	}

}
