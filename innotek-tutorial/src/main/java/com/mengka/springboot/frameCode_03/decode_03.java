package com.mengka.springboot.frameCode_03;

import com.mengka.springboot.frameCode_02.HexParser;

/**
 * @author huangyy
 * @date 2017/11/17.
 */
public class decode_03 {

    public static void main(String[] args) {
        /**
         * step01:
         *  设备上报数据
         */
        String inputStr = "3001000075000000003900000330aa006e11091e0e19320001000000000001000011091e0e19321964c810333930303030303300000000000000000000000000000000000000000000000000000000000000000000000011091e0e193211091e0e193200000000000000000000000000000000000000000000000000000000";

        /**
         * step02:
         *  接口1：
         *   ObjectNode decode(byte[] var1)
         *
         *  设备的上行报文可以分为两种情况：
         *   1.设备上报数据；
         *   2.设备对平台命令的应答；
         */
        byte[] binarry = HexParser.parseHexStr2Byte(inputStr);

        /**
         * step03:
         *   上报数据响应
         *
         *  消息类型：cloudRsp
         *
         *  接口2：
         *   byte[] encode(ObjectNode var1)
         *
         *
         *  平台的下行报文可以分为两种情况：
         *  1.平台消息下发；
         *  2.平台对设备上报数据的应答；
         */
        String hexStr = HexParser.parseBcd2HexStr(binarry);
        System.out.println("hexStr = " + hexStr);
    }
}
