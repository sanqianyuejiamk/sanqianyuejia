package com.mengka.springboot.frameCode_01.decode;

import java.nio.ByteBuffer;
import java.util.Date;


/**
 * 传感器车载标签帧
 *
 * @author zhuhy
 * @version cabbage-pro1.1,2017-6-14
 * @since cabbage-pro1.1
 */
public class NbSensorTagFrame extends NocFrameBody {
    private final static int LEN_OF_RESERVED = 7;

    //发送时间
    private Date sentTime;
    //相同数据发送序号
    private int sendIndex;

    //U8 Flag
    //BIT0：0，驶入阅读标签；1，MOVE 阅读标签
    //BIT1：0，非首条标签数据；1，首条标签数据
    //其他位保留
    private int flag;

    //车载标签 0 版本
    private String tag0Version = null;
    //车载标签 1版本
    private String tag1Version = null;
    //车载标签 2 版本
    private String tag2Version = null;

    //读取到车载标签的个数
    private int tagNum;

    //车载标签0地址值
    private String tag0Address;
    //BIT7&BIT6：0 加速度稳态，1 加速度动态，2 加速度异常，3 暂无含义；
    //BIT0：USB 是否充电；
    //其他位保留。。
    private int tag0Flag;
    //车载标签 0 电池电压
    private float tag0Voltage;
    //S8,车载标签 0 回复给传感器的 RSSI
    private int tag0RssiReq;

    //车载标签1地址值
    private String tag1Address;
    //BIT7&BIT6：0 加速度稳态，1 加速度动态，2 加速度异常，3 暂无含义；
    //BIT0：USB 是否充电；
    //其他位保留。。
    private int tag1Flag;
    //车载标签 1 电池电压
    private float tag1Voltage;
    //S8,车载标签 1 回复给传感器的 RSSI
    private int tag1RssiReq;

    //车载标签2地址值
    private String tag2Address;
    //BIT7&BIT6：0 加速度稳态，1 加速度动态，2 加速度异常，3 暂无含义；
    //BIT0：USB 是否充电；
    //其他位保留。。
    private int tag2Flag;
    //车载标签 2 电池电压
    private float tag2Voltage;
    //S8,车载标签 2回复给传感器的 RSSI
    private int tag2RssiReq;


    public NbSensorTagFrame(ByteBuffer buffer) {
        //发送时间U8(6)
        byte year = buffer.get();
        sentTime = NocHelper.toDateFromGMT(year, buffer.get(),
                buffer.get(), buffer.get(), buffer.get(), buffer.get());
        if (year == Constants.NUM_ZERO) {
            sentTime = null;
        }

        //U8,相同数据发送序号
        sendIndex = NocHelper.asUnsignedByte(buffer.get());

        //U8,flag
        //BIT0：0，驶入阅读标签；1，MOVE 阅读标签
        //BIT1：0，非首条标签数据；1，首条标签数据
        //其他位保留
        flag = NocHelper.asUnsignedByte(buffer.get());

        //U8 车载标签 0 版本,例如0x11表示1.01，最大可表示15.15
        tag0Version = NocHelper.getFormatVersion(
                NocHelper.asUnsignedByte(buffer.get()));
        //U8 车载标签 1 版本,例如0x11表示1.01，最大可表示15.15
        tag1Version = NocHelper.getFormatVersion(
                NocHelper.asUnsignedByte(buffer.get()));
        //U8 车载标签 2 版本,例如0x11表示1.01，最大可表示15.15
        tag2Version = NocHelper.getFormatVersion(
                NocHelper.asUnsignedByte(buffer.get()));

        //U8,读取到车载标签的个数，个数决定后面的数据长度
        tagNum = NocHelper.asUnsignedByte(buffer.get());

        //U32,车载标签 0地址值
        tag0Address = NocHelper.getFormatAddress(
                NocHelper.asUnsignedInt(buffer.getInt()));
        //U8,BIT7&BIT6：0 加速度稳态，1 加速度动态，2 加速度异常，3 暂无含义；
        //		BIT0：USB 是否充电；。
        tag0Flag = NocHelper.asUnsignedByte(buffer.get());
        //U8 车载标签 0 电池电压，0-120 表示 3.00-4.20V
        tag0Voltage = NocHelper.getRealTagVoltage(buffer.get());
        //s8,  车载标签 0回复给传感器的RSSI
        tag0RssiReq = buffer.get();

        if (tagNum >= Constants.NUM_TWO) {
            //U32,车载标签 1地址值
            tag1Address = NocHelper.getFormatAddress(
                    NocHelper.asUnsignedInt(buffer.getInt()));
            //U8,BIT7&BIT6：0 加速度稳态，1 加速度动态，2 加速度异常，3 暂无含义；
            //		BIT0：USB 是否充电；。
            tag1Flag = NocHelper.asUnsignedByte(buffer.get());
            //U8 车载标签 0 电池电压，0-120 表示 3.00-4.20V
            tag1Voltage = NocHelper.getRealTagVoltage(buffer.get());
            //s8,  车载标签 0回复给传感器的RSSI
            tag1RssiReq = buffer.get();

            if (tagNum >= Constants.NUM_THREE) {
                //U32,车载标签 2地址值
                tag2Address = NocHelper.getFormatAddress(
                        NocHelper.asUnsignedInt(buffer.getInt()));
                //U8,BIT7&BIT6：0 加速度稳态，1 加速度动态，2 加速度异常，3 暂无含义；
                //		BIT0：USB 是否充电；。
                tag2Flag = NocHelper.asUnsignedByte(buffer.get());
                //U8 车载标签 0 电池电压，0-120 表示 3.00-4.20V
                tag2Voltage = NocHelper.getRealTagVoltage(buffer.get());
                //s8,  车载标签 0回复给传感器的RSSI
                tag2RssiReq = buffer.get();
            }
        }

        //U8[7]保留值
        getReserved(buffer, LEN_OF_RESERVED);
    }


    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();

        builder.append("======== NB Sensor Tag Frame Start ========\n");
        if (null == sentTime) {
            builder.append(NocHelper.formatString("time:0-0-0 00:00:00\n"));
        } else {
            builder.append(NocHelper.formatString("time:%s\n", sentTime.toString()));
        }
        builder.append(NocHelper.formatString("sendIndex:%d\n", sendIndex));
        builder.append(NocHelper.formatString("flag:%d\n", flag));
        builder.append(NocHelper.formatString("tag0Version:%s\n", tag0Version));
        builder.append(NocHelper.formatString("tag1Version:%s\n", tag1Version));
        builder.append(NocHelper.formatString("tag2Version:%s\n", tag2Version));
        builder.append(NocHelper.formatString("tagNum:%d\n", tagNum));

        builder.append(NocHelper.formatString("tag0Address:%s\n", tag0Address));
        builder.append(NocHelper.formatString("tag0AccStatus:%d\n", tag0Flag));
        builder.append(NocHelper.formatString("tag0Voltage:%d\n", tag0Voltage));
        builder.append(NocHelper.formatString("tag0RssiReq:%d\n", tag0RssiReq));

        if (tagNum >= Constants.NUM_TWO) {
            builder.append(NocHelper.formatString("tag1Address:%s\n", tag1Address));
            builder.append(NocHelper.formatString("tag1Flag:%d\n", tag1Flag));
            builder.append(NocHelper.formatString("tag1Voltage:%d\n", tag1Voltage));
            builder.append(NocHelper.formatString("tag1RssiReq:%d\n", tag1RssiReq));

            if (tagNum >= Constants.NUM_THREE) {
                builder.append(NocHelper.formatString("tag2Address:%s\n", tag2Address));
                builder.append(NocHelper.formatString("tag2Flag:%d\n", tag2Flag));
                builder.append(NocHelper.formatString("tag2Voltage:%d\n", tag2Voltage));
                builder.append(NocHelper.formatString("tag2RssiReq:%d\n", tag2RssiReq));
            }
        }

        builder.append("======== NB Sensor Tag Frame End ========\n");

        return builder.toString();
    }


    /**
     * 获取发送时间
     *
     * @return
     */
    public Date getSentTime() {
        return sentTime;
    }


    /**
     * 传感器成功发送数据的序号
     *
     * @return
     */
    public int getSendIndex() {
        return sendIndex;
    }


    /**
     * 获取阅读标签类型
     * 0，驶入阅读标签；1，MOVE 阅读标签
     *
     * @return
     */
    public int getActType() {
        return (flag & FrameFlagMask.MASK_TAG_FG_ACT_TYPE);
    }


    /**
     * 是否首条标签数据
     * 0，非首条标签数据；1，首条标签数据
     *
     * @return
     */
    public boolean isFirst() {
        return (flag & FrameFlagMask.MASK_TAG_FG_FIRST)
                == FrameFlagMask.MASK_TAG_FG_FIRST;
    }


    /**
     * 获取车载标签0版本号
     *
     * @return
     */
    public String getTag0Version() {
        return tag0Version;
    }


    /**
     * 获取车载标签1版本号
     *
     * @return
     */
    public String getTag1Version() {
        return tag1Version;
    }


    /**
     * 获取车载标签2版本号
     *
     * @return
     */
    public String getTag2Version() {
        return tag2Version;
    }


    /**
     * 读取到车载标签的个数
     *
     * @return
     */
    public int getTagNum() {
        return tagNum;
    }

    /**
     * 车载标签0地址值
     *
     * @return
     */
    public String getTag0Address() {
        return tag0Address;
    }

    /**
     * 车载标签0电压
     *
     * @return
     */
    public float getTag0Voltage() {
        return tag0Voltage;
    }


    /**
     * 车载标签0AccStatus, 0加速度稳态， 1加速度动态 ，2加速度异常  3暂无含 暂无含 义。
     *
     * @return
     */
    public int getTag0AccStatus() {
        return tag0Flag >> Constants.NUM_SIX;
    }


    /**
     * 是否USB充电中
     *
     * @return
     */
    public boolean isTag0UsbCharging() {
        return (tag0Flag & FrameFlagMask.MASK_TAG_DFG_USB_CHARGING)
                == FrameFlagMask.MASK_TAG_DFG_USB_CHARGING;
    }


    /**
     * 车载标签 0 回复给传感器的 RSSI
     *
     * @return
     */
    public int getTag0RssiReq() {
        return tag0RssiReq;
    }

    /**
     * 车载标签1地址值
     *
     * @return
     */
    public String getTag1Address() {
        return tag1Address;
    }

    /**
     * 车载标签1电压
     *
     * @return
     */
    public float getTag1Voltage() {
        return tag1Voltage;
    }


    /**
     * 车载标签1AccStatus, 0加速度稳态， 1加速度动态 ，2加速度异常  3暂无含 暂无含 义。
     *
     * @return
     */
    public int getTag1AccStatus() {
        return tag1Flag >> Constants.NUM_SIX;
    }


    /**
     * 车载标签1是否USB充电中
     *
     * @return
     */
    public boolean isTag1UsbCharging() {
        return (tag1Flag & FrameFlagMask.MASK_TAG_DFG_USB_CHARGING)
                == FrameFlagMask.MASK_TAG_DFG_USB_CHARGING;
    }


    /**
     * 车载标签 1 回复给传感器的 RSSI
     *
     * @return
     */
    public int getTag1RssiReq() {
        return tag1RssiReq;
    }


    /**
     * 车载标签2地址值
     *
     * @return
     */
    public String getTag2Address() {
        return tag2Address;
    }


    /**
     * 车载标签2电压
     *
     * @return
     */
    public float getTag2Voltage() {
        return tag2Voltage;
    }


    /**
     * 车载标签2AccStatus, 0加速度稳态， 1加速度动态 ，2加速度异常  3暂无含 暂无含 义。
     *
     * @return
     */
    public int getTag2AccStatus() {
        return tag2Flag >> Constants.NUM_SIX;
    }


    /**
     * 车载标签2是否USB充电中
     *
     * @return
     */
    public boolean isTag2UsbCharging() {
        return (tag2Flag & FrameFlagMask.MASK_TAG_DFG_USB_CHARGING)
                == FrameFlagMask.MASK_TAG_DFG_USB_CHARGING;
    }


    /**
     * 车载标签 2 回复给传感器的 RSSI
     *
     * @return
     */
    public int getTag2RssiReq() {
        return tag2RssiReq;
    }

}
