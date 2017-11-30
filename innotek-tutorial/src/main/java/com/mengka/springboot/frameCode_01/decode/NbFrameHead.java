package com.mengka.springboot.frameCode_01.decode;

import java.nio.ByteBuffer;


/**
 * 帧头
 *
 * @author zhuhy
 * @version cabbage-pro1.1,2017-6-14
 * @since cabbage-pro1.1
 */
public class NbFrameHead {
    //标志位
    //d0:应用层是否应答标识，0：不应答，1：应答；	（COAP 协议默认为不应答，UDP 协议默认为应答）
    //d1~d3:保留位
    //d4~d7:DeviceType：设备类型，目前暂定设备类型为 6。
    private int flag;
    //传感器地址
    private String addr;
    //帧序号
    private int seq;
    //控制码
    private int ctrlCode;
    //操作码
    private int opCode;
    //数据域长度，2个字节可表示的最大数据域长度为65535
    private int dataLen;


    public NbFrameHead(ByteBuffer buffer) {
        flag = NocHelper.asUnsignedByte(buffer.get());
        addr = NocHelper.getFormatAddress(
                NocHelper.asUnsignedInt(buffer.getInt()));
        seq = NocHelper.asUnsignedByte(buffer.get());

        ctrlCode = NocHelper.asUnsignedByte(buffer.get());
        opCode = NocHelper.asUnsignedByte(buffer.get());
        dataLen = NocHelper.asUnsignedShort(buffer.get());

        System.out.println(this.toString());
    }


    /**
     * 设置是否需要响应标志
     *
     * @param flag
     */
    public void setFlag(int flag) {
        this.flag = flag;
    }

    /**
     * 获取是否需要响应标志
     *
     * @return
     */
    public int getFlag() {
        return flag;
    }

    /**
     * 设置序列号
     *
     * @param seq
     */
    public void setSeq(int seq) {
        this.seq = seq;
    }

    /**
     * 获取序列号
     *
     * @return
     */
    public int getSeq() {
        return seq;
    }


    /**
     * 设置传感器地址
     *
     * @param addr
     */
    public void setAddr(String addr) {
        this.addr = addr;
    }

    /**
     * 获取传感器地址
     *
     * @return
     */
    public String getAddr() {
        return addr;
    }


    /**
     * 设置数据长度
     *
     * @param dataLen
     */
    public void setDataLen(int dataLen) {
        this.dataLen = dataLen;
    }


    /**
     * 获取数据长度
     *
     * @return
     */
    public int getDataLen() {
        return dataLen;
    }


    /**
     * 设置控制码
     *
     * @param ctrlCode
     */
    public void setCtrlCode(int ctrlCode) {
        this.ctrlCode = ctrlCode;
    }

    /**
     * 获取控制码
     *
     * @return
     */
    public int getCtrlCode() {
        return ctrlCode;
    }


    /**
     * 设置操作码
     *
     * @param opCode
     */
    public void setOpCode(int opCode) {
        this.opCode = opCode;
    }


    /**
     * 获取操作码
     *
     * @return
     */
    public int getOpCode() {
        return opCode;
    }


    /**
     * 转换为打印字符串
     */
    @Override
    public String toString() {
        StringBuilder sbResult = new StringBuilder();
        sbResult.append("=====NB Frame Head Start=======\n");
        sbResult.append(NocHelper.formatString("flag: %02X\n", flag));
        sbResult.append(NocHelper.formatString("addr: %s\n", addr));
        sbResult.append(NocHelper.formatString("seq: %d\n", seq));
        sbResult.append(NocHelper.formatString("ctrl code: 0x%02x\n", ctrlCode));
        sbResult.append(NocHelper.formatString("op code: 0x%02x\n", opCode));
        sbResult.append(NocHelper.formatString("data len: %d\n", dataLen));
        sbResult.append("=====NB Frame Head End=======\n");

        return sbResult.toString();
    }

}
