package com.mengka.springboot.frameCode_03;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mengka.springboot.frameCode_02.HexParser;
import lombok.extern.log4j.Log4j2;

/**
 * @author huangyy
 * @date 2017/11/17.
 */
@Log4j2
public class encode_03 {

    public static void main(String[] args) throws Exception {
        /**
         * step01:
         *   下发命令
         */
        String inputCommand = "{\n" +
                "        \"identifier\":\"innotek\",\n" +
                "        \"msgType\":\"cloudReq\",\n" +
                "        \"serviceId\":\"SensorService\",\n" +
                "        \"cmd\":\"UART_data\",\n" +
                "        \"paras\":{\n" +
                "            \"value\":\"12\"\n" +
                "        },\n" +
                "        \"hasMore\":0,\n" +
                "        \"mid\":0\n" +
                "}";
        ObjectNode node = (ObjectNode) new ObjectMapper().readTree(inputCommand);

        /**
         * step02:
         *   命令编码
         */
        JsonNode parasNode = node.get("paras");
        String data = parasNode.get("value").textValue();
        log.info("-----CLOUD_REQ data----- \n" + data);
        String hexStr = HexParser.parseByte2HexStr(data.getBytes());
        System.out.println("hexStr = " + hexStr);

        /**
         *  step03:
         *    返回二进制数据
         *
         *    return HexParser.parseHexStr2Bcd(hexStr);
         */
    }
}
