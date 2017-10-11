package com.mengka.springboot.dao.persistence;

import com.mengka.springboot.dao.domain.BerthDO;

import java.util.List;

public interface BerthDOMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table base_berth
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table base_berth
     *
     * @mbg.generated
     */
    int insert(BerthDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table base_berth
     *
     * @mbg.generated
     */
    int insertSelective(BerthDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table base_berth
     *
     * @mbg.generated
     */
    BerthDO selectByPrimaryKey(String id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table base_berth
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(BerthDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table base_berth
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(BerthDO record);

    /**
     * 查询所有泊位
     *
     * @return
     */
    List<BerthDO> queryAllBerth();
}
