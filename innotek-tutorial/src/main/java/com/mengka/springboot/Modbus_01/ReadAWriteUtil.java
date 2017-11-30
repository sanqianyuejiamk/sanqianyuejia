package com.mengka.springboot.Modbus_01;

import com.serotonin.modbus4j.ModbusFactory;
import com.serotonin.modbus4j.ModbusMaster;
import com.serotonin.modbus4j.exception.ModbusInitException;
import com.serotonin.modbus4j.exception.ModbusTransportException;
import com.serotonin.modbus4j.ip.IpParameters;
import com.serotonin.modbus4j.msg.ModbusRequest;
import com.serotonin.modbus4j.msg.ModbusResponse;
import com.serotonin.modbus4j.msg.ReadHoldingRegistersRequest;
import com.serotonin.modbus4j.msg.WriteRegistersRequest;
import com.serotonin.modbus4j.msg.WriteRegistersResponse;
import com.serotonin.util.queue.ByteQueue;
import lombok.extern.slf4j.Slf4j;


/**
 * 》》下载：
 * https://sourceforge.net/projects/modbus4j/files/modbus4j/1.1/
 * <p>
 *  Modbus是一种串行通信协议，是Modicon公司于1979年为使用可编程逻辑控制器（PLC）通信而发表。
 *  Modbus是工业领域通信协议的业界标准（De facto），并且现在是工业电子设备之间相当常用的连接方式。
 *
 *  MODBUS是一个工业上通信常用的通讯协议,一般在PLC上面用的比较多,主要是定义了一种数据传输的规范。
 *
 *  Modbus允许多个 (大约240个) 设备连接在同一个网络上进行通信，
 *
 *  举个例子，
 *  一个由测量温度和湿度的装置，并且将结果发送给计算机。在数据采集与监视控制系统（SCADA）中，
 *  Modbus通常用来连接监控计算机和远程终端控制系统（RTU）。
 * <p>
 * modbus4j:
 * A high-performance and ease-of-use implementation of the Modbus protocol written in Java by Infinite Automation Systems Inc..
 * Supports ASCII, RTU, TCP, and UDP transports as slave or master,
 * automatic request partitioning and response data type parsing.
 *
 * @author huangyy
 * @date 2017/11/30.
 */
@Slf4j
public class ReadAWriteUtil {

    /**
     * 批量写数据到保持寄存器
     *
     * @param ip      从站IP
     * @param port    modbus端口
     * @param slaveId 从站ID
     * @param start   起始地址偏移量
     * @param values  待写数据
     */
    public static void modbusWTCP(String ip, int port, int slaveId, int start, short[] values) {
        ModbusFactory modbusFactory = new ModbusFactory();
        // 设备ModbusTCP的Ip与端口，如果不设定端口则默认为502
        IpParameters params = new IpParameters();
        params.setHost(ip);
        // 设置端口，默认502
        if (502 != port) {
            params.setPort(port);
        }
        ModbusMaster tcpMaster = null;
        // 参数1：IP和端口信息 参数2：保持连接激活
        tcpMaster = modbusFactory.createTcpMaster(params, true);
        try {
            tcpMaster.init();
            System.out.println("=======初始化成功========");
        } catch (ModbusInitException e) {
            System.out.println("初始化异常");
        }
        try {
            WriteRegistersRequest request = new WriteRegistersRequest(slaveId, start, values);
            WriteRegistersResponse response = (WriteRegistersResponse) tcpMaster.send(request);
            if (response.isException()) {
                System.out.println("Exception response: message=" + response.getExceptionMessage());
            } else {
                System.out.println("Success");
            }
        } catch (ModbusTransportException e) {
            e.printStackTrace();
        }
    }


    /**
     * 读保持寄存器上的内容
     *
     * @param ip        从站IP
     * @param port      modbus端口
     * @param start     起始地址偏移量
     * @param readLenth 待读寄存器个数
     * @return
     */
    public static ByteQueue modbusTCP(String ip, int port, int start, int readLenth) {
        ModbusFactory modbusFactory = new ModbusFactory();
        // 设备ModbusTCP的Ip与端口，如果不设定端口则默认为502
        IpParameters params = new IpParameters();
        params.setHost(ip);
        //设置端口，默认502
        if (502 != port) {
            params.setPort(port);
        }
        ModbusMaster tcpMaster = null;
        tcpMaster = modbusFactory.createTcpMaster(params, true);
        try {
            tcpMaster.init();
            System.out.println("========初始化成功=======");
        } catch (ModbusInitException e) {
            log.error("tcpMaster init error!", e);
            return null;
        }
        ModbusRequest modbusRequest = null;
        try {
            //功能码03   读取保持寄存器的值
            modbusRequest = new ReadHoldingRegistersRequest(1, start, readLenth);
        } catch (ModbusTransportException e) {
            e.printStackTrace();
        }
        ModbusResponse modbusResponse = null;
        try {
            modbusResponse = tcpMaster.send(modbusRequest);
        } catch (ModbusTransportException e) {
            log.error("tcpMaster send error!", e);
            e.printStackTrace();
        }
        ByteQueue byteQueue = new ByteQueue(1024);
        modbusResponse.write(byteQueue);
        System.out.println("功能码:" + modbusRequest.getFunctionCode());
        System.out.println("从站地址:" + modbusRequest.getSlaveId());
        System.out.println("收到的响应信息大小:" + byteQueue.size());
        System.out.println("收到的响应信息值:" + byteQueue);
        return byteQueue;
    }
}
