package com.mengka.springboot.Modbus_02;

import com.serotonin.modbus4j.ModbusFactory;
import com.serotonin.modbus4j.ModbusMaster;
import com.serotonin.modbus4j.code.DataType;
import com.serotonin.modbus4j.code.RegisterRange;
import com.serotonin.modbus4j.ip.IpParameters;

/**
 *  Modbus协议是一个master/slave架构的协议。
 *  https://zh.wikipedia.org/wiki/Modbus
 *
 *  有一个节点是master节点，其他使用Modbus协议参与通信的节点是slave节点。
 *  每一个slave设备都有一个唯一的地址。
 *
 *  在串行和MB+网络中，只有被指定为主节点的节点可以启动一个命令（在以太网上，任何一个设备都能发送一个Modbus命令，但是通常也只有一个主节点设备引导指令）。
 *
 * @author huangyy
 * @date 2017/11/30.
 */
public class Test {

    public static void main(String[] args) throws Exception {
        ModbusFactory factory = new ModbusFactory();
        IpParameters params = new IpParameters();
        params.setHost("127.0.0.1");
        params.setPort(502);
        params.setEncapsulated(true);
        ModbusMaster master = factory.createTcpMaster(params, false);
        // master.setRetries(4);
        master.setTimeout(2000);
        master.setRetries(0);

        long start = System.currentTimeMillis();
        try {
            master.init();
            for (int i = 0; i < 100; i++) {
                System.out.println(master.getValue(127, RegisterRange.HOLDING_REGISTER, 1220,
                        DataType.TWO_BYTE_INT_UNSIGNED));
            }
        } finally {
            master.destroy();
        }

        System.out.println("Took: " + (System.currentTimeMillis() - start) + "ms");
    }
}
