package com.mengka.springboot.frameCode_01;

import com.mengka.springboot.frameCode_01.util.CRC16;
import com.mengka.springboot.frameCode_01.util.NocHelper;
import lombok.extern.log4j.Log4j2;

/**
 * @author huangyy
 * @date 2017/11/06.
 */
@Log4j2
public class frameCode_02 {

    public static void main(String[] args) {
        int[] decodeData = new int[]{123, 96, 57, 0, 0, 68, 58, 17, 170, 32, 17, 9, 28, 21, 23, 56, 168, 0, 164, 0, 24, 251, 199, 254, 146, 255, 227, 0, 238, 7, 50, 16, 119, 29, 0, 0, 0, 0, 26, 60, 37, 0, 34, 153, 125};

        // CRC 校验
        int crcResult = CRC16.calcCrc(decodeData, 1, decodeData.length - 3); //计算从flag到data的校验值
        int crcExcept = decodeData[decodeData.length - 3] * 256 + decodeData[decodeData.length - 2];//计算crc校验值
        if (crcResult != crcExcept) {
            log.error("crcResult=" + crcResult + ",crcExcept=" + crcExcept);
            return;
        }

        /**
         *  60390000443A11AA2011091C151738A800A40018FBC7FE92FFE300EE073210771D000000001A3C2500
         */
        //去除帧头帧尾及校验码转换为16进制字符串
        String result = NocHelper.toHexString(decodeData, 1, decodeData.length - 3);
        log.info("crc16 result is " + result);
    }
}
