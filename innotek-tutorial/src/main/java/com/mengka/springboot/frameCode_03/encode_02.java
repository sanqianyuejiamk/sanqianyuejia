package com.mengka.springboot.frameCode_03;

import com.mengka.springboot.frameCode_02.HexParser;
import com.mengka.springboot.util.TimeUtil;
import lombok.extern.log4j.Log4j2;
import java.util.Date;

/**
 * @author huangyy
 * @date 2017/11/16.
 */
@Log4j2
public class encode_02 {

    public static void main(String[] args) {
        String data = "Just For Test[" + TimeUtil.toDate(new Date(), TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS);
        String result = HexParser.parseByte2HexStr(data.getBytes());
        log.info("result = " + result);

        byte[] datas = HexParser.parseHexStr2Byte(result);
        log.info("datas = " + new String(datas));


        byte[] bcd = HexParser.parseHexStr2Bcd(result);
        String hexStr = HexParser.parseBcd2HexStr(bcd);
        byte[] datas2 = HexParser.parseHexStr2Byte(hexStr);
        log.info("datas2 = " + new String(datas2));


        String hexStr2 = "223132323232323322";
        byte[] datas3 = HexParser.parseHexStr2Byte(hexStr2);
        log.info("datas3 = " + new String(datas3));
    }
}
