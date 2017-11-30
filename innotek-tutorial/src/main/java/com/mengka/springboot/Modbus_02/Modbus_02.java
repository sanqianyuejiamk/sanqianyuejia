package com.mengka.springboot.Modbus_02;

import com.serotonin.util.queue.ByteQueue;
import lombok.extern.slf4j.Slf4j;

/**
 * @author huangyy
 * @date 2017/11/30.
 */
@Slf4j
public class Modbus_02 {

    public static void main(String[] args) {
        ByteQueue dataBuffer = new ByteQueue();

        String message = "mengka AAA..";
        byte[] data = message.getBytes();

        dataBuffer.push(data, 0, data.length);

//        byte[] buf = new byte[1024];
//        dataBuffer.pop(buf);
//        String result = new String(buf);
//        log.info("result = " + result);

        byte[] allData = dataBuffer.popAll();
        String result2 = new String(allData);
        log.info("result2 = " + result2);
    }
}
