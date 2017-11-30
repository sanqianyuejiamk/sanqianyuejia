package com.mengka.springboot.Modbus_03;

import com.serotonin.io.serial.*;
import com.serotonin.modbus4j.*;
import com.serotonin.modbus4j.exception.*;
import com.serotonin.modbus4j.msg.*;
import java.util.*;


/**
 *
 *  》》MODBUS通讯:
 *  http://blog.csdn.net/u010655348/article/details/52665170
 *
 *  gnu.io.NoSuchPortException is occuring while executing the program
 *  This also seems to happen if RXTX is not correctly installed.
 *
 *  See HERE:
 *  https://stackoverflow.com/questions/274179/nosuchportexception-using-rxtx-java-library-on-windows
 *
 */
final class HardneedlTest {
    //MODBUS网络上从站地址
    private final static int SLAVE_ADDRESS = 5;

    //串行口波特率
    private final static int BAUD_RATE = 9600;

    public static void main(String[] args) throws Exception {
        SerialParameters serialParameters = new SerialParameters();

        //设定MODBUS通讯的串行口
        serialParameters.setCommPortId("COM3");

        //设定成无奇偶校验
        serialParameters.setParity(0);

        //设定成数据位是8位
        serialParameters.setDataBits(8);

        //设定为1个停止位
        serialParameters.setStopBits(1);

        serialParameters.setPortOwnerName("Numb nuts");

        //串行口上的波特率
        serialParameters.setBaudRate(BAUD_RATE);

        ModbusFactory modbusFactory = new ModbusFactory();
        ModbusMaster master = modbusFactory.createRtuMaster(serialParameters);
        try {
            master.init();
            readDiscreteInputTest(master, SLAVE_ADDRESS, 0, 8);
            writeRegistersTest(master, SLAVE_ADDRESS, 0, new short[]{0x31, 0xb, 0xc, 0xd, 0xe, 0x9, 0x8, 0x7, 0x6});
            readHoldingRegistersTest(master, SLAVE_ADDRESS, 0, 8);
        } finally {
            master.destroy();
        }
    }

    /**
     * 读开关量型的输入信号
     *
     * @param master  主站
     * @param slaveId 从站地址
     * @param start   起始偏移量
     * @param len     待读的开关量的个数
     */
    private static void readDiscreteInputTest(ModbusMaster master, int slaveId, int start, int len) {
        try {
            ReadDiscreteInputsRequest request = new ReadDiscreteInputsRequest(slaveId, start, len);
            ReadDiscreteInputsResponse response = (ReadDiscreteInputsResponse) master.send(request);

            if (response.isException())
                System.out.println("Exception response: message=" + response.getExceptionMessage());
            else
                System.out.println(Arrays.toString(response.getBooleanData()));
        } catch (ModbusTransportException e) {
            e.printStackTrace();
        }
    }

    /**
     * 读保持寄存器上的内容
     *
     * @param master  主站
     * @param slaveId 从站地址
     * @param start   起始地址的偏移量
     * @param len     待读寄存器的个数
     */
    private static void readHoldingRegistersTest(ModbusMaster master, int slaveId, int start, int len) {
        try {
            ReadHoldingRegistersRequest request = new ReadHoldingRegistersRequest(slaveId, start, len);
            ReadHoldingRegistersResponse response = (ReadHoldingRegistersResponse) master.send(request);

            if (response.isException())
                System.out.println("Exception response: message=" + response.getExceptionMessage());
            else
                System.out.println(Arrays.toString(response.getShortData()));
        } catch (ModbusTransportException e) {
            e.printStackTrace();
        }
    }

    /**
     * 批量写数据到保持寄存器
     *
     * @param master  主站
     * @param slaveId 从站地址
     * @param start   起始地址的偏移量
     * @param values  待写数据
     */
    public static void writeRegistersTest(ModbusMaster master, int slaveId, int start, short[] values) {
        try {
            WriteRegistersRequest request = new WriteRegistersRequest(slaveId, start, values);
            WriteRegistersResponse response = (WriteRegistersResponse) master.send(request);

            if (response.isException())
                System.out.println("Exception response: message=" + response.getExceptionMessage());
            else
                System.out.println("Success");
        } catch (ModbusTransportException e) {
            e.printStackTrace();
        }
    }
}