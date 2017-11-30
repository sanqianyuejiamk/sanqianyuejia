package com.mengka.springboot.frameCode_01.decode;


import java.nio.ByteBuffer;
import java.util.Date;


/**
 * 传感器数据帧
 * 含传感器检测、心跳、调试帧格式
 *
 * @author zhuhy
 * @version cabbage-pro1.0,2016-12-21
 * @since cabbage-pro1.0
 */
public class NbSensorDataFrame extends NocFrameBody {

    public static final int NUM_ZERO = 0;
    public static final int NUM_ONE = 1;
    public static final int NUM_TWO = 2;
    public static final int NUM_THREE = 3;
    public static final int NUM_FOUR = 4;
    public static final int NUM_FIVE = 5;
    public static final int NUM_SIX = 6;
    public static final int NUM_SEVEN = 7;
    public static final int NUM_EIGHT = 8;
    public static final int NUM_NINE = 9;
    public static final int NUM_TEN = 10;
    public static final int NUM_ELEVEN = 11;
    public static final int NUM_TWELVE = 12;
    public static final int NUM_NEGATIVE_ONE = -1;

    //保留字节数
    private final static int LEN_OF_RESERVED = 2;
    //imsi字段长度
    private final static int LEN_OF_IMSI = 16;

    private int ctrlCode;

    //发送时间
    private Date sentTime;

    //信号强度
    private Byte rssi;

    //基站编号
    private int cellId;

    //连续搜索网络次数
    private int netSearchCnt;


    //车位事件EVENTFLAG
    //Bits 2，1，0：
    //000 = 没有事件（用于确认车位状态）；
    //001 = 到达事件（Arrival）；
    //010 = 离开事件（Departure）；
    //011 = 移动事件（Move）；
    //Bit 3：车位状态，0：车位空闲；1：车位占用；
    //Bit 4：磁检测状态，0：磁检测异常；1：磁检测正常；
    //Bit 5：是否首条数据，0：不是首条数据；1：首条数据（说明MCU 刚复位）；
    //Bit 6：是否手动清零，0：不是手动清零；1：手动清零；
    //Bit 7：抗干扰A 开关状态，0：关闭；1：打开。
    private int parkEvent;

    //当前X轴平均磁场值
    private int magX;
    //当前Y轴平均磁场值
    private int magY;
    //当前Z轴平均磁场值
    private int magZ;
    //当前状态和绝对零点向量差的值
    private int magVectorDelta;

    //抗干扰 C参数，低四位 参数，低四位 参数，低四位 X，高四位保留，0~15
    //显示转换为 -7~8
    private int antiJamCParaX;

    //传感器标志参数1
    //SensorFlag1里面包含一些辅助信息，其义如下：
    //Bit 7，6：
    //抗干扰 B参数 1，0：关闭， ：关闭， 1：抗 1；2：抗 2；3：抗 3；
    //Bit 5，4，3，2，1，0：
    //抗干扰 B参数 2，0～63；
    private int sensorFlag1;


    //传感器标志参数 2
    //SensorFlag2里面包含一些辅助信息，其义如下：
    //Bit 7：保留，暂时值为 0；
    //Bit 6：serve_type，通讯方式，0：COAP；1：UDP；
    //Bit 5：udpbackup_switch，UDP 通讯时的备用服务器开关，0：关闭；1：开启；
    //Bit 4：udp_ack，UDP 通讯时的 ACK 模式，0：非 ACK；1：ACK；
    //Bit 3：抗干扰 C开关状态， 开关状态， 0：关闭； ：关闭； 1：打开；
    //Bit 2：车载 标签 开关 ，0：关闭 ，1：开启 ；
    //Bit 1：自动清零标志， 0：未自动清零， 1：自动清零；
    //Bit 0：泊位类型， 0：平行泊位， 1：垂直、斜向泊位；
    private int sensorFlag2;

    //抗干扰 C参数，低四位 参数，低四位 Y，高四位 Z，0~15
    //显示转换为-7~8
    private int antiJamCParaYZ;
    private int antiJamCParaY;
    private int antiJamCParaZ;

    //信噪比
    private int snr;
    //?????????????
    //信号覆盖等级：0，1，2
    private int ecl;

    //传感器心跳帧多出字段
    //-------------------------------
    //上次24小时泊位周转次数
    private Integer turnoverNum;
    //传感器温度，-40～85
    private Byte temperature;
    //传感器电压，0～60，真实电压=(Voltage+300)/100，小数点精度为2位，小于3.30则存储为3.30
    private Float voltage = null;
    //传感器软件版本号，例如0x11表示1.01，最大可表示15.15
    private String versionSoft = null;
    //传感器硬件版本号，例如0x11表示1.01，最大可表示15.15
    private String versionHard = null;

    //传感器调试帧多出字段
    //-------------------------------
    //角度判断有车移动的参数
    private Integer carMoveAngle = null;
    //合量判断有车移动的参数
    private Integer carMoveVector = null;
    //角度判断车状态改变的参数
    private Integer carStateAngle = null;
    //合量判断车状态改变的参数
    private Integer carStateVector = null;
    //IMSI 信息，15 个 ASCII码，最后一个字节是 0
    private String imsi;
    //备用 UDP 服务器 IP
    private String udpBackupIp;
    //备用 UDP 服务器端口
    private Integer udpBackupPort;


    public NbSensorDataFrame(ByteBuffer buffer, int ctrlCode) {
        this.ctrlCode = ctrlCode;

        //发送时间U8(6)
        byte year = buffer.get();
        sentTime = NocHelper.toDateFromGMT(year, buffer.get(),
                buffer.get(), buffer.get(), buffer.get(), buffer.get());
        if (NUM_ZERO == year) {
            sentTime = null;
        }

        //S8,信号强度
        rssi = buffer.get();

        //U16,基站编号
        cellId = NocHelper.asUnsignedShort(buffer.getShort());
        //U8, 连续搜索网络次数
        netSearchCnt = NocHelper.asUnsignedByte(buffer.get());

        //U8,车位事件
        parkEvent = NocHelper.asUnsignedByte(buffer.get());

        //S16，当前X轴平均磁场值
        magX = buffer.getShort();
        //S16，当前Y轴平均磁场值
        magY = buffer.getShort();
        //S16，当前Z轴平均磁场值
        magZ = buffer.getShort();
        //U16,当前状态和绝对零点状态向量差的绝对值
        magVectorDelta = NocHelper.asUnsignedShort(buffer.getShort());

        //U8抗干扰 C参数，低四位 参数，低四位 参数，低四位 X，高四位保留， ， 高四位保留， 高四位保留， 高四位保留0~15
        //显示转换为 显示转换为 显示转换为 -7~8
        antiJamCParaX = NocHelper.asUnsignedByte(buffer.get());
        antiJamCParaX = (antiJamCParaX & 0x0F) - NUM_SEVEN;

        //U8,传感器标志参数 1
        sensorFlag1 = NocHelper.asUnsignedByte(buffer.get());
        //U8,传感器标志参数 2
        sensorFlag2 = NocHelper.asUnsignedByte(buffer.get());

        //U8,抗干扰 C参数，低四位 Y，高四位 Z，0~15
        //显示转换为 -7~8
        antiJamCParaYZ = NocHelper.asUnsignedByte(buffer.get());
        antiJamCParaY = (antiJamCParaYZ & 0x0F) - NUM_SEVEN;
        antiJamCParaZ = (antiJamCParaYZ >> NUM_FOUR) - NUM_SEVEN;

        //S8,信噪比
        snr = buffer.get();
        //U8,BIT0~BIT1：信号覆盖等级：0，1，2
        ecl = NocHelper.asUnsignedByte(buffer.get());

        //U8[2]保留值,默认0
        getReserved(buffer, LEN_OF_RESERVED);

        if (FrameCode.FCC_SENSOR_HEARTBEAT == ctrlCode
                || FrameCode.FCC_SENSOR_DEBUG == ctrlCode) {
            //U8 TurnoverNum 上次 24 小时泊位周转次数
            turnoverNum = NocHelper.asUnsignedByte(buffer.get());

            //s8, 传感器温度，-40～85
            temperature = buffer.get();

            //U8, 传感器电压，0～60，真实电压=(Voltage+300)/100，小数点精度为2位，小于3.30则存储为3.30
            voltage = NocHelper.getRealSensorVoltage(buffer.get());

            //U8, 传感器软件版本号，例如0x11表示1.01，最大可表示15.15
            versionSoft = NocHelper.getFormatVersion(
                    NocHelper.asUnsignedByte(buffer.get()));

            //U8, 传感器硬件版本号，例如0x11表示1.01，最大可表示15.15
            versionHard = NocHelper.getFormatVersion(
                    NocHelper.asUnsignedByte(buffer.get()));
        }

        if (FrameCode.FCC_SENSOR_DEBUG == ctrlCode) {
            //U8,角度判断有车移动的参数
            carMoveAngle = NocHelper.asUnsignedByte(buffer.get());
            //u8, 合量判断有车移动的参数
            carMoveVector = NocHelper.asUnsignedByte(buffer.get());
            //u8, 角度判断车状态改变的参数
            carStateAngle = NocHelper.asUnsignedByte(buffer.get());
            //合量判断车状态改变的参数
            carStateVector = NocHelper.asUnsignedByte(buffer.get());
            //S8[16]IMSI 信息，15 个 ASCII 码，最后一个字节是 0
            int[] imsi1 = new int[LEN_OF_IMSI];
            for (int k = NUM_ZERO; k < LEN_OF_IMSI; k++) {
                imsi1[k] = buffer.get();
            }
            imsi = NocHelper.asciiToString(imsi1).trim();
            //U8[4]备用 UDP 服务器 IP
            udpBackupIp = NocHelper.asUnsignedByte(buffer.get())
                    + "." + NocHelper.asUnsignedByte(buffer.get())
                    + "." + NocHelper.asUnsignedByte(buffer.get())
                    + "." + NocHelper.asUnsignedByte(buffer.get());
            //U16,备用 UDP 服务器端口
            udpBackupPort = NocHelper.asUnsignedShort(buffer.getShort());
        }
    }


    @Override
    public String toString() {
        String frameName = "";
        if (FrameCode.FCC_SENSOR_CHECK == ctrlCode) {
            frameName = "NB Sensor Check Frame";
        } else if (FrameCode.FCC_SENSOR_HEARTBEAT == ctrlCode) {
            frameName = "NB Sensor HeartBeat Frame";
        } else if (FrameCode.FCC_SENSOR_DEBUG == ctrlCode) {
            frameName = "NB Sensor Debug Frame";
        }

        StringBuilder builder = new StringBuilder();
        builder.append("======== " + frameName + " Start ========\n");
        if (null == sentTime) {
            builder.append(NocHelper.formatString("time:0-0-0 00:00:00\n"));
        } else {
            builder.append(NocHelper.formatString("time:%s\n", sentTime.toString()));
        }
        builder.append(NocHelper.formatString("rssi:%d\n", rssi));
        builder.append(NocHelper.formatString("cellId:%d\n", cellId));
        builder.append(NocHelper.formatString("netSearchCnt:%d\n", netSearchCnt));
        builder.append(NocHelper.formatString("parkEvent:%d\n", parkEvent));
        builder.append(NocHelper.formatString("magX:%d\n", magX));
        builder.append(NocHelper.formatString("magY:%d\n", magY));
        builder.append(NocHelper.formatString("magZ:%d\n", magZ));
        builder.append(NocHelper.formatString("magVectorDelta:%d\n", magVectorDelta));
        builder.append(NocHelper.formatString("antiJamCParaX:%d\n", antiJamCParaX));
        builder.append(NocHelper.formatString("antiJamCParaYZ:%d\n", antiJamCParaYZ));
        builder.append(NocHelper.formatString("sensorFlag1:%d\n", sensorFlag1));
        builder.append(NocHelper.formatString("sensorFlag2:%d\n", sensorFlag2));
        builder.append(NocHelper.formatString("snr:%d\n", snr));
        builder.append(NocHelper.formatString("ecl:%d\n", ecl));

        if (FrameCode.FCC_SENSOR_HEARTBEAT == ctrlCode
                || FrameCode.FCC_SENSOR_DEBUG == ctrlCode) {
            builder.append(NocHelper.formatString("turnoverNum:%d\n", turnoverNum));
            builder.append(NocHelper.formatString("temperature:%d\n", temperature));
            builder.append(NocHelper.formatString("voltage:%f\n", voltage));

            builder.append(NocHelper.formatString("versionSoft:%s\n", versionSoft));
            builder.append(NocHelper.formatString("versionHard:%s\n", versionHard));
        }
        if (FrameCode.FCC_SENSOR_DEBUG == ctrlCode) {
            builder.append(NocHelper.formatString("carMoveAngle:%d\n", carMoveAngle));
            builder.append(NocHelper.formatString("carMoveVector:%d\n", carMoveVector));
            builder.append(NocHelper.formatString("carStateAngle:%d\n", carStateAngle));
            builder.append(NocHelper.formatString("carStateVector:%d\n", carStateVector));
            builder.append(NocHelper.formatString("imsi:%s\n", imsi));
            builder.append(NocHelper.formatString("udpBackupIp:%s\n", udpBackupIp));
            builder.append(NocHelper.formatString("udpBackupPort:%d\n", udpBackupPort));
        }
        builder.append("======== " + frameName + " End========\n");

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
     * 获取信号强度
     *
     * @return
     */
    public int getRssi() {
        return rssi;
    }

    /**
     * 获取基站ID
     *
     * @return
     */
    public int getCellId() {
        return cellId;
    }

    /**
     * 连续搜索网络次数
     *
     * @return
     */
    public int getNetSearchCnt() {
        return netSearchCnt;
    }


    /**
     * 车位事件
     *
     * @return
     */
    public int getParkEvent() {
        return parkEvent;
    }

    /**
     * 是否车辆到达
     *
     * @return
     */
    public boolean isCheckIn() {
        return (parkEvent & FrameFlagMask.MASK_PE_EVENTTYPE)
                == FrameFlagMask.PE_CHECK_IN;
    }

    /**
     * 是否车辆到达
     *
     * @return
     */
    public boolean isArrival() {
        return (parkEvent & FrameFlagMask.MASK_PE_EVENTTYPE)
                == FrameFlagMask.PE_ARRIVAL;
    }

    /**
     * 是否车辆离开
     *
     * @return
     */
    public boolean isDeparture() {
        return (parkEvent & FrameFlagMask.MASK_PE_EVENTTYPE)
                == FrameFlagMask.PE_DEPARTURE;
    }

    /**
     * 是否跟车
     *
     * @return
     */
    public boolean isMove() {
        return (parkEvent & FrameFlagMask.MASK_PE_EVENTTYPE)
                == FrameFlagMask.PE_MOVE;
    }

    /**
     * 是否干预事件
     *
     * @return
     */
    public boolean isTamper() {
        return (parkEvent & FrameFlagMask.MASK_PE_EVENTTYPE)
                == FrameFlagMask.PE_TAMPER;
    }


    /**
     * 车位是否占用
     *
     * @return
     */
    public boolean isOccupied() {
        return (parkEvent & FrameFlagMask.MASK_PE_OCCUPIED)
                == FrameFlagMask.MASK_PE_OCCUPIED;
    }

    /**
     * 磁检测状态是否正常
     *
     * @return
     */
    public boolean isMagGood() {
        return (parkEvent & FrameFlagMask.MASK_PE_MAG_GOOD)
                == FrameFlagMask.MASK_PE_MAG_GOOD;
    }


    /**
     * 是否首条数据
     *
     * @return
     */
    public boolean isFirst() {
        return (parkEvent & FrameFlagMask.MASK_PE_FIRST)
                == FrameFlagMask.MASK_PE_FIRST;
    }


    /**
     * 是否清零数据,0：不是清零数据；1：清零后首条数据；
     *
     * @return
     */
    public boolean isZeroedManu() {
        return (parkEvent & FrameFlagMask.MASK_PE_ZEROED)
                == FrameFlagMask.MASK_PE_ZEROED;
    }


    /**
     * 抗干扰A 开关状态,0：关闭；1：打开
     *
     * @return
     */
    public boolean isAntiJamA() {
        return (parkEvent & FrameFlagMask.MASK_PE_ANTIJAM_A)
                == FrameFlagMask.MASK_PE_ANTIJAM_A;
    }


    /**
     * 抗干扰 B参数 1，0：关闭， ：关闭， 1：抗 1；2：抗 2；3：抗 3；
     *
     * @return
     */
    public int getAntiJamB() {
        return sensorFlag1 >> NUM_SIX;
    }


    /**
     * 抗干扰 B参数 2，0～63；
     *
     * @return
     */
    public int getAntiJamBPara() {
        return sensorFlag1 & FrameFlagMask.MASK_SF1_ANTIJAM_B_PARA;
    }

    /**
     * 泊位类型， 0：平行泊位， 1：垂直、斜向泊位；
     *
     * @return
     */
    public int getBerthType() {
        return sensorFlag2 & FrameFlagMask.MASK_SF2_BERTH_TYPE;
    }

    /**
     * 自动清零标志，0：未自动清零， 1：自动清零
     *
     * @return
     */
    public boolean isZeroedAuto() {
        return (sensorFlag2 & FrameFlagMask.MASK_SF2_ZEROED_AUTO)
                == FrameFlagMask.MASK_SF2_ZEROED_AUTO;
    }


    /**
     * 车载标签开关，0：关闭， 1：打开
     *
     * @return
     */
    public boolean isSensorTag() {
        return (sensorFlag2 & FrameFlagMask.MASK_SF2_SENSORTAG)
                == FrameFlagMask.MASK_SF2_SENSORTAG;
    }


    /**
     * 抗干扰 C开关状态， 0：关闭；  1：打开；
     *
     * @return
     */
    public boolean isAntiJamC() {
        return (sensorFlag2 & FrameFlagMask.MASK_SF2_ANTIJAM_C)
                == FrameFlagMask.MASK_SF2_ANTIJAM_C;
    }


    /**
     * snr
     *
     * @return
     */
    public int getSnr() {
        return snr;
    }


    /**
     * ecl
     *
     * @return
     */
    public int getEcl() {
        return ecl & FrameFlagMask.MASK_NSE_ECL;
    }


    /**
     * UDP通讯时的 ACK模式，0：非 ACK；1：ACK；
     *
     * @return
     */
    public boolean isUdpAck() {
        return (sensorFlag2 & FrameFlagMask.MASK_SF2_ACK)
                == FrameFlagMask.MASK_SF2_ACK;
    }


    /**
     * UDP 通讯时的备用服务器开关，0：关闭；1：开启；
     *
     * @return
     */
    public boolean isUdpBackupSwitch() {
        return (sensorFlag2 & FrameFlagMask.MASK_SF2_UDP_BACKUP_SWITCH)
                == FrameFlagMask.MASK_SF2_UDP_BACKUP_SWITCH;
    }


    /**
     * 通讯方式，0：COAP；1：UDP；
     *
     * @return
     */
    public int getServerType() {
        if ((sensorFlag2 & FrameFlagMask.MASK_SF2_SERVER_TYPE)
                == FrameFlagMask.MASK_SF2_SERVER_TYPE) {
            return NUM_ONE;
        } else {
            return NUM_ZERO;
        }
    }


    /**
     * 省电模式，0：关闭；1：开启；
     *
     * @return
     */
    public boolean isPowerSave() {
        return (sensorFlag2 & FrameFlagMask.MASK_SF2_POWER_SAVE)
                == FrameFlagMask.MASK_SF2_POWER_SAVE;
    }


    /**
     * 抗干扰C参数X
     *
     * @return
     */
    public int getAntiJamCParaX() {
        return antiJamCParaX;
    }

    /**
     * 抗干扰C参数Y
     *
     * @return
     */
    public int getAntiJamCParaY() {
        return antiJamCParaY;
    }


    /**
     * 抗干扰C参数Z
     *
     * @return
     */
    public int getAntiJamCParaZ() {
        return antiJamCParaZ;
    }

    /**
     * 当前X轴平均磁场值
     *
     * @return
     */
    public int getMagX() {
        return magX;
    }


    /**
     * 当前Y轴平均磁场值
     *
     * @return
     */
    public int getMagY() {
        return magY;
    }

    /**
     * 当前Z轴平均磁场值
     *
     * @return
     */
    public int getMagZ() {
        return magZ;
    }


    /**
     * 当前状态和绝对零点向量差的值
     *
     * @return
     */
    public int getMagVectorDelta() {
        return magVectorDelta;
    }


    /**
     * 上次24小时泊位周转次数
     *
     * @return
     */
    public Integer getTurnoverNum() {
        return turnoverNum;
    }


    /**
     * 获取温度
     *
     * @return
     */
    public Byte getTemperature() {
        return temperature;
    }


    /**
     * 传感器电压
     *
     * @return
     */
    public Float getVoltage() {
        return voltage;
    }


    /**
     * 软件版本
     *
     * @return
     */
    public String getVersionSoft() {
        return versionSoft;
    }


    /**
     * 硬件版本
     *
     * @return
     */
    public String getVersionHard() {
        return versionHard;
    }


    /**
     * 角度判断有车移动的参数
     *
     * @return
     */
    public Integer getCarMoveAngle() {
        return carMoveAngle;
    }

    /**
     * 合量判断有车移动的参数
     *
     * @return
     */
    public Integer getCarMoveVector() {
        return carMoveVector;
    }

    /**
     * 角度判断车状态改变的参数
     *
     * @return
     */
    public Integer getCarStateAngle() {
        return carStateAngle;
    }


    /**
     * 合量判断车状态改变的参数
     *
     * @return
     */
    public Integer getCarStateVector() {
        return carStateVector;
    }


    /**
     * IMSI 信息
     *
     * @return
     */
    public String getImsi() {
        return imsi;
    }


    /**
     * 备用 UDP服务器 IP
     *
     * @return
     */
    public String getUdpBackupIp() {
        return udpBackupIp;
    }


    /**
     * 备用 UDP服务器端口
     *
     * @return
     */
    public Integer getUdpBackupPort() {
        return udpBackupPort;
    }

}
