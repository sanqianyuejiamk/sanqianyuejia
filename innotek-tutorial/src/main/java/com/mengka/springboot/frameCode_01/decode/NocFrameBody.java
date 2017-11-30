package com.mengka.springboot.frameCode_01.decode;

import java.nio.ByteBuffer;


/**
 * NOC消息帧，所有网关上传消息帧的父帧
 *
 * @author zhuhy
 * @version cabbage-pro1.0,2016-12-21
 * @since cabbage-pro1.0
 */
public abstract class NocFrameBody {

    public static final int NUM_ZERO = 0;

    /**
     * 转换为字符串
     *
     * @see Object#toString()
     */
    public String toString() {
        return null;
    }


    /**
     * 获取保留字
     *
     * @param buffer
     * @param len
     * @return
     */
    protected byte[] getReserved(ByteBuffer buffer, int len) {
        byte[] reserved = new byte[len];
        for (int i = NUM_ZERO; i < len; i++) {
            reserved[i] = buffer.get();
        }

        return reserved;
    }
}
