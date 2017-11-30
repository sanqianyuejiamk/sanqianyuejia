package com.mengka.springboot.crc_01;

/**
 *  CRC16循环校验码
 *
 * @author huangyy
 * @date 2017/11/27.
 */
public class Taa {

    public static void main(String[] args) {
        int[] decodeData = new int[]{123, 96, 57, 0, 0, 68, 58, 17, 170, 32, 17, 9, 28, 21, 23, 56, 168, 0, 164, 0, 24, 251, 199, 254, 146, 255, 227, 0, 238, 7, 50, 16, 119, 29, 0, 0, 0, 0, 26, 60, 37, 0, 34, 153, 125};

        // CRC 校验
        int crcResult = CRC16.calcCrc(decodeData, 1, decodeData.length - 3); //计算从flag到data的校验值
        int crcExcept = decodeData[decodeData.length - 3] * 256 + decodeData[decodeData.length - 2];//计算crc校验值
        if (crcResult != crcExcept) {
            System.out.println("crcResult=" + crcResult + ",crcExcept=" + crcExcept);
            //异常处理
            return;
        }
    }
}
