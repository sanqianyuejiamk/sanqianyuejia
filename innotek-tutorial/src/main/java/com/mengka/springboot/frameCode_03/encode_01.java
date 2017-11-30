package com.mengka.springboot.frameCode_03;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mengka.springboot.frameCode_02.HexParser;
import lombok.extern.log4j.Log4j2;

/**
 * @author huangyy
 * @date 2017/11/16.
 */
@Log4j2
public class encode_01 {

    /**
     *
     *  7B226964656E746966696572223A22696E6E6F74656B222C226D736754797065223A22636C6F7564526571222C22736572766963654964223A2253656E736F7253657276696365222C22636D64223A22554152545F64617461222C227061726173223A7B2276616C7565223A223132227D2C226861734D6F7265223A302C226D6964223A307D
     *  7B226964656E746966696572223A22696E6E6F74656B222C226D736754797065223A22636C6F7564526571222C22736572766963654964223A2253656E736F7253657276696365222C22636D64223A22554152545F64617461222C227061726173223A7B2276616C7565223A223132227D2C226861734D6F7265223A302C226D6964223A307D
     *
     * @param args
     */
    public static void main(String[] args) {
        ObjectNode objectNode = initData();
        byte[] data = objectNode.toString().getBytes();
        String result = HexParser.parseBcd2HexStr(data);
        System.out.println("encode command result is " + result);
    }

    public static ObjectNode initData() {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode paras = mapper.createObjectNode();
        paras.put("value", "12");

        ObjectNode root = mapper.createObjectNode();
        root.put("identifier", "innotek");
        root.put("msgType", "cloudReq");
        root.put("serviceId", "SensorService");
        root.put("cmd", "UART_data");
        root.put("paras", paras);
        root.put("hasMore", 0);
        root.put("mid", 0);
        return root;
    }
}
