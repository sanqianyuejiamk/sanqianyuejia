package com.mengka.springboot.Modbus_01;

import com.mengka.springboot.util.TimeUtil;
import com.serotonin.modbus4j.base.ModbusUtils;
import lombok.extern.slf4j.Slf4j;
import java.util.Date;

/**
 * @author huangyy
 * @date 2017/11/30.
 */
@Slf4j
public class write_01 {

    public static void main(String[] args) {
        log.info("Modbus_01 Server start..");


        int start = 0;//起始地址偏移量
        String message = "Just for test[" + TimeUtil.toDate(new Date(), TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS);
        short[] values = convertToShorts(message.getBytes());
        //批量写数据
        ReadAWriteUtil.modbusWTCP(Constant.MODBUS_IP, Constant.MODBUS_PORT, Constant.SLAVE_ID, start, values);

        log.info("Modbus_01 Server end..");
    }

    protected static short[] convertToShorts(byte[] data) {
        short[] sdata = new short[data.length / 2];

        for (int i = 0; i < sdata.length; ++i) {
            sdata[i] = ModbusUtils.toShort(data[i * 2], data[i * 2 + 1]);
        }

        return sdata;
    }
}
