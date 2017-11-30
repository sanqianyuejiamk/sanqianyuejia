package com.mengka.springboot.frameCode_01;

import lombok.extern.log4j.Log4j2;

/**
 * @author huangyy
 * @date 2017/11/06.
 */
@Log4j2
public class frameCode_01 {

    //起始字节
    public static byte FC_START = 0x7B;
    //结束字节
    public static byte FC_END = 0x7D;
    //隐藏字节
    public static byte FC_ESCAPE = 0x40;

    public static void main(String[] args){
        log.info("FC_START = "+FC_START);

        log.info("FC_END = "+FC_END);

        log.info("FC_ESCAPE = "+FC_ESCAPE);


        log.info("0xff = "+0xff);


        int[] aa = new int[]{123,96,57,0,0,68,58,17,170,32,17,9,28,21,23,56,168,0,164,0,24,251,199,254,146,255,227,0,238,7,50,16,119,29,0,0,0,0,26,60,37,0,34,153,125};
        log.info(aa);
    }
}
