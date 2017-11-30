package com.mengka.springboot.frameCode_02;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.log4j.Log4j2;
import net.sf.json.JSONArray;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author huangyy
 * @date 2017/11/16.
 */
@Log4j2
public class decode_02 {

    public static void main(String[] args) throws Exception {
        decode_02 frameCode_02 = new decode_02();
        String data = "3001000075000000003900000330aa006e11091e0e19320001000000000001000011091e0e19321964c810333930303030303300000000000000000000000000000000000000000000000000000000000000000000000011091e0e193211091e0e193200000000000000000000000000000000000000000000000000000000";
        ObjectNode objectNode = frameCode_02.decode(HexParser.parseHexStr2Byte(data));
        log.info("objectNode = " + objectNode.toString());
    }

    public ObjectNode decode(byte[] paramArrayOfByte) throws Exception {
        JSONArray data = GetJSONArray(paramArrayOfByte);
        ArrayNode dataNode = getArrayNode(data);

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        //解析设备地址   读取json值
//		JsonNode inNode=mapper.readTree(binaryData);
//		root.put("identifier", inNode.get("device_uuid").asText());
        root.put("identifier", "innotek");
        root.put("msgType", "deviceReq");
        root.put("hasMore", 0);
        //Bind array node
        root.put("data", dataNode);

        System.out.println("data->" + root.get("data").toString());
        System.out.println("result->" + root.toString());
        log.info("dynamic lrbtest " + root.toString());

        return root;
    }

    public static JSONArray GetJSONArray(byte[] byteArray) {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < byteArray.length; i++) {
            jsonArray.add(i, Integer.valueOf(byteArray[i] & 0xFF));
        }
        return jsonArray;
    }

    private ArrayNode getArrayNode(JSONArray data) {
        String result_data = "";
        for (int i = 0; i < data.size(); i++) {
            result_data += data.getInt(i) + ",";
        }
//		result_data="["+result_data.substring(0, result_data.length()-1)+"]";
        result_data = "" + result_data.substring(0, result_data.length() - 1) + "";

        //组装body实体
        ObjectMapper mapper = new ObjectMapper();

        //***********************************
        ObjectNode node2 = mapper.createObjectNode();

        int startIndex = 0;
        int endIndex = result_data.indexOf(Constant.DELIMITER);
        String head = result_data.substring(startIndex, endIndex);
        node2.put("head", head);
        result_data = result_data.substring(endIndex + 1);

        endIndex = result_data.indexOf(Constant.DELIMITER);
        String flag = result_data.substring(startIndex, endIndex);
        node2.put("flag", flag);
        result_data = result_data.substring(endIndex + 1);

        endIndex = getFromIndex(result_data, Constant.DELIMITER, 4);
        String addr = result_data.substring(startIndex, endIndex);
        node2.put("addr", addr);
        result_data = result_data.substring(endIndex + 1);

        endIndex = result_data.indexOf(Constant.DELIMITER);
        String seq = result_data.substring(startIndex, endIndex);
        node2.put("seq", seq);
        result_data = result_data.substring(endIndex + 1);

        endIndex = result_data.indexOf(Constant.DELIMITER);
        String ctrlCode = result_data.substring(startIndex, endIndex);
        node2.put("ctrlCode", ctrlCode);
        result_data = result_data.substring(endIndex + 1);

        endIndex = result_data.indexOf(Constant.DELIMITER);
        String opCode = result_data.substring(startIndex, endIndex);
        node2.put("opCode", opCode);
        result_data = result_data.substring(endIndex + 1);

        endIndex = result_data.indexOf(Constant.DELIMITER);
        String dataLength = result_data.substring(startIndex, endIndex);
        node2.put("dataLength", dataLength);
        result_data = result_data.substring(endIndex + 1);

        startIndex = result_data.lastIndexOf(Constant.DELIMITER) + 1;
        endIndex = result_data.length();
        String tail = result_data.substring(startIndex, endIndex);
        result_data = result_data.substring(0, startIndex - 1);

        startIndex = result_data.lastIndexOf(Constant.DELIMITER, result_data.lastIndexOf(Constant.DELIMITER) - 1) + 1;
        endIndex = result_data.length();
        String crc = result_data.substring(startIndex, endIndex);
        result_data = result_data.substring(0, startIndex - 1);

//	    node2.put("data", result_data);
        String time = null;
        String rssi = null;
        String cellId = null;
        String netSearchCnt = null;
        String eventFlag = null;
        String magX = null;
        String magY = null;
        String magZ = null;
        String magVectorDelta = null;
        String antiJamCParaX = null;
        String sensorFlag1 = null;
        String sensorFlag2 = null;
        String antiJamCParaYZ = null;
        String snr = null;
        String ecl = null;
        String received = null;

        if (Constant.CHECK_CODE.equals(ctrlCode)
                || Constant.HEART_CODE.equals(ctrlCode)
                || Constant.DEBUG_CODE.equals(ctrlCode)) {
            startIndex = 0;
            endIndex = getFromIndex(result_data, Constant.DELIMITER, 6);
            time = result_data.substring(startIndex, endIndex);
            node2.put("time", time);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            rssi = result_data.substring(startIndex, endIndex);
            node2.put("rssi", rssi);
            result_data = result_data.substring(endIndex + 1);

            endIndex = getFromIndex(result_data, Constant.DELIMITER, 2);
            cellId = result_data.substring(startIndex, endIndex);
            node2.put("cellId", cellId);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            netSearchCnt = result_data.substring(startIndex, endIndex);
            node2.put("netSearchCnt", netSearchCnt);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            eventFlag = result_data.substring(startIndex, endIndex);
            node2.put("eventFlag", eventFlag);
            result_data = result_data.substring(endIndex + 1);

            endIndex = getFromIndex(result_data, Constant.DELIMITER, 2);
            magX = result_data.substring(startIndex, endIndex);
            node2.put("magX", magX);
            result_data = result_data.substring(endIndex + 1);

            endIndex = getFromIndex(result_data, Constant.DELIMITER, 2);
            magY = result_data.substring(startIndex, endIndex);
            node2.put("magY", magY);
            result_data = result_data.substring(endIndex + 1);

            endIndex = getFromIndex(result_data, Constant.DELIMITER, 2);
            magZ = result_data.substring(startIndex, endIndex);
            node2.put("magZ", magZ);
            result_data = result_data.substring(endIndex + 1);

            endIndex = getFromIndex(result_data, Constant.DELIMITER, 2);
            magVectorDelta = result_data.substring(startIndex, endIndex);
            node2.put("magVectorDelta", magVectorDelta);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            antiJamCParaX = result_data.substring(startIndex, endIndex);
            node2.put("antiJamCParaX", antiJamCParaX);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            sensorFlag1 = result_data.substring(startIndex, endIndex);
            node2.put("sensorFlag1", sensorFlag1);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            sensorFlag2 = result_data.substring(startIndex, endIndex);
            node2.put("sensorFlag2", sensorFlag2);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            antiJamCParaYZ = result_data.substring(startIndex, endIndex);
            node2.put("antiJamCParaYZ", antiJamCParaYZ);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            snr = result_data.substring(startIndex, endIndex);
            node2.put("snr", snr);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            ecl = result_data.substring(startIndex, endIndex);
            node2.put("ecl", ecl);
            result_data = result_data.substring(endIndex + 1);

            if (Constant.CHECK_CODE.equals(ctrlCode)) {
                endIndex = result_data.length();
                received = result_data.substring(startIndex, endIndex);
                node2.put("received", received);
            } else {
                endIndex = getFromIndex(result_data, Constant.DELIMITER, 2);
                received = result_data.substring(startIndex, endIndex);
                node2.put("received", received);
                result_data = result_data.substring(endIndex + 1);
            }
        }

        if (Constant.HEART_CODE.equals(ctrlCode) || Constant.DEBUG_CODE.equals(ctrlCode)) {
            startIndex = 0;
            endIndex = result_data.indexOf(Constant.DELIMITER);
            String turnoverNum = result_data.substring(startIndex, endIndex);
            node2.put("turnoverNum", turnoverNum);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            String temperature = result_data.substring(startIndex, endIndex);
            node2.put("temperature", temperature);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            String voltage = result_data.substring(startIndex, endIndex);
            node2.put("voltage", voltage);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            String versionSoft = result_data.substring(startIndex, endIndex);
            node2.put("versionSoft", versionSoft);
            result_data = result_data.substring(endIndex + 1);

            if (Constant.HEART_CODE.equals(ctrlCode)) {
                endIndex = result_data.length();
                String versionHard = result_data.substring(startIndex, endIndex);
                node2.put("versionHard", versionHard);
            } else {
                endIndex = result_data.indexOf(Constant.DELIMITER);
                String versionHard = result_data.substring(startIndex, endIndex);
                node2.put("versionHard", versionHard);
                result_data = result_data.substring(endIndex + 1);
            }
        }

        if (Constant.DEBUG_CODE.equals(ctrlCode)) {
            startIndex = 0;
            endIndex = result_data.indexOf(Constant.DELIMITER);
            String carMoveAngle = result_data.substring(startIndex, endIndex);
            node2.put("carMoveAngle", carMoveAngle);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            String carMoveVector = result_data.substring(startIndex, endIndex);
            node2.put("carMoveVector", carMoveVector);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            String carStateAngle = result_data.substring(startIndex, endIndex);
            node2.put("carStateAngle", carStateAngle);
            result_data = result_data.substring(endIndex + 1);

            endIndex = result_data.indexOf(Constant.DELIMITER);
            String carStateVector = result_data.substring(startIndex, endIndex);
            node2.put("carStateVector", carStateVector);
            result_data = result_data.substring(endIndex + 1);

            endIndex = getFromIndex(result_data, Constant.DELIMITER, 16);
            String imsi = result_data.substring(startIndex, endIndex);
            node2.put("imsi", imsi);
            result_data = result_data.substring(endIndex + 1);

            endIndex = getFromIndex(result_data, Constant.DELIMITER, 4);
            String udpBackupIp = result_data.substring(startIndex, endIndex);
            node2.put("udpBackupIp", udpBackupIp);
            result_data = result_data.substring(endIndex + 1);

            node2.put("udpBackupPort", result_data);
        }

        node2.put("crc", crc);
        node2.put("tail", tail);

        //***********************************
//	    ObjectNode node2 = mapper.createObjectNode();
//	    node2.put("sensorData", node2);
//	    node2.put ("sensorData", result_data);

        //Create a child node
        ObjectNode node1 = mapper.createObjectNode();
        node1.put("serviceId", "SensorService");
        node1.put("serviceData", node2);
        //Array of nodes
        ArrayNode dataNode = mapper.createArrayNode();
        dataNode.add(node1);
        return dataNode;
    }

    /**
     * 子字符串modelStr在字符串str中第count次出现时的下标
     *
     * @param str
     * @param modelStr
     * @param count
     * @return
     */
    private int getFromIndex(String str, String modelStr, Integer count) {
        //对子字符串进行匹配
        Matcher slashMatcher = Pattern.compile(modelStr).matcher(str);
        int index = 0;
        //matcher.find();尝试查找与该模式匹配的输入序列的下一个子序列
        while (slashMatcher.find()) {
            index++;
            //当modelStr字符串第count次出现的位置
            if (index == count) {
                break;
            }
        }
        //matcher.start();返回以前匹配的初始索引
        return slashMatcher.start();
    }
}
