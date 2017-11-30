package com.mengka.springboot.Modbus_01;

import com.serotonin.util.queue.ByteQueue;
import lombok.extern.slf4j.Slf4j;

/**
 * @author huangyy
 * @date 2017/11/30.
 */
@Slf4j
public class read_01 {

    public static void main(String[] args) {
        log.info("Modbus_01 Client start..");

        int start = 0;
        int readLenth = 10;

        ByteQueue byteQueue = ReadAWriteUtil.modbusTCP(Constant.MODBUS_IP, Constant.MODBUS_PORT, start, readLenth);
        byte[] allData = byteQueue.popAll();
        String result2 = new String(allData);
        log.info("result2 = " + result2);

        log.info("Modbus_01 Client end..");
    }
}
