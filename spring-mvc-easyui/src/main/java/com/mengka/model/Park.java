/** 
 * Project Name:cabbage 
 * File Name:BasePark.java 
 * Package Name:com.innotek.system.entity 
 * Date:2016年11月16日上午10:14:15 
 * Copyright (c) 2004-2016 All Rights Reserved. 
 * 
 */
package com.mengka.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/** 
 * 停车点实体类
 * base_park表实体类 
 * 
 * @author panyp 
 * @version cabbage1.0,2016-11-16
 * @since cabbage1.0  
 */
public class Park implements Serializable 
{
	/**  **/
	private static final long serialVersionUID = 1L;

	//主键id
	private String id;
	//停车点名称
	private String parkName;
	//所属城市
	private Integer cityCode;
	//所属区域
	private Integer regionCode;
	//地址（道路名）
	private String address;
	//经度
	private Double longitude;
	//纬度
	private Double latitude;
	//是否有效（1：有效；0：无效）
	private Integer isValid;
	//创建人
	private String createdBy;
	//最后修改人
	private String updatedBy;
	//创建时间
	private Date createTime;
	//更新时间
	private Date updateTime;
	
	//城市名称
	private String cityName;
	//区域名称
	private String regionName;
	//泊位数
	private Integer berthCount;
	//空泊位数
	private Integer idelBerthCount;
	//是否中心停车的
	private boolean centerPark;
	//停车点下有车泊位停车记录详情列表
	private List<ParkRecord> carList;
	//停车点下无车泊位详情列表
	private List<ParkRecord> berthList;

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
	 * @return regionId
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
	 * @return address
	 */
	public String getAddress() 
	{
		return address;
	}

	/** 
	 * @param address
	 */
	public void setAddress(String address) 
	{
		this.address = address;
	}

	/**
	 * @return longitude
	 */
	public Double getLongitude() 
	{
		return longitude;
	}

	/** 
	 * @param longitude
	 */
	public void setLongitude(Double longitude) 
	{
		this.longitude = longitude;
	}

	/**
	 * @return latitude
	 */
	public Double getLatitude() 
	{
		return latitude;
	}

	/** 
	 * @param latitude
	 */
	public void setLatitude(Double latitude) 
	{
		this.latitude = latitude;
	}

	/**
	 * @return isValid
	 */
	public Integer getIsValid() 
	{
		return isValid;
	}

	/** 
	 * @param isValid
	 */
	public void setIsValid(Integer isValid) 
	{
		this.isValid = isValid;
	}


	/**
	 * @return createdBy
	 */
	public String getCreatedBy() 
	{
		return createdBy;
	}

	/** 
	 * @param createdBy
	 */
	public void setCreatedBy(String createdBy) 
	{
		this.createdBy = createdBy;
	}

	/**
	 * @return updatedBy
	 */
	public String getUpdatedBy() 
	{
		return updatedBy;
	}

	/** 
	 * @param updatedBy
	 */
	public void setUpdatedBy(String updatedBy) 
	{
		this.updatedBy = updatedBy;
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
	 * @return updateTime
	 */
	public Date getUpdateTime() 
	{
		return updateTime;
	}

	/** 
	 * @param updateTime
	 */
	public void setUpdateTime(Date updateTime) 
	{
		this.updateTime = updateTime;
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
	 * @return berthCount
	 */
	public Integer getBerthCount() 
	{
		return berthCount;
	}

	/** 
	 * @param berthCount
	 */
	public void setBerthCount(Integer berthCount) 
	{
		this.berthCount = berthCount;
	}

	/**
	 * @return idelBerthCount
	 */
	public Integer getIdelBerthCount()
	{
		return idelBerthCount;
	}

	/** 
	 * @param idelBerthCount
	 */
	public void setIdelBerthCount(Integer idelBerthCount)
	{
		this.idelBerthCount = idelBerthCount;
	}

	/**
	 * @return centerPark
	 */
	public boolean isCenterPark() 
	{
		return centerPark;
	}

	/** 
	 * @param centerPark
	 */
	public void setCenterPark(boolean centerPark)
	{
		this.centerPark = centerPark;
	}

	/**
	 * @return carList
	 */
	public List<ParkRecord> getCarList() 
	{
		return carList;
	}

	/** 
	 * @param carList
	 */
	public void setCarList(List<ParkRecord> carList)
	{
		this.carList = carList;
	}

	/**
	 * @return berthList
	 */
	public List<ParkRecord> getBerthList() 
	{
		return berthList;
	}

	/** 
	 * @param berthList
	 */
	public void setBerthList(List<ParkRecord> berthList) 
	{
		this.berthList = berthList;
	}

}
