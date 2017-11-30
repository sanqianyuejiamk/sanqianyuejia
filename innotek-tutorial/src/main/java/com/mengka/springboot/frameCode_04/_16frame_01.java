package com.mengka.springboot.frameCode_04;

import com.mengka.springboot.frameCode_02.HexParser;
import lombok.extern.log4j.Log4j2;
import net.sf.json.JSONArray;

import java.util.Arrays;

/**
 * 60390000443A11AA2011091C151738A800A40018FBC7FE92FFE300EE073210771D000000001A3C2500
 * <p>
 * 7B
 * 60390000491E11AA20110B1B081522B500620010FD47FF5CFCDA00220732107700010000000F3C2600
 * 88
 * F7
 * 7D
 *
 * @author huangyy
 * @date 2017/11/27.
 */
@Log4j2
public class _16frame_01 {

    //隐藏字节
    public static byte FC_ESCAPE = 0x40;

    /**
     * 1.先获取到有帧头，帧尾并去掉转义后的完整数据
     * 2.判断帧长度是否合法
     * 3.判断crc校验是否正常
     * 4.判断应用层长度和帧当前的长度是否合法
     *
     * @param args
     */
    public static void main(String[] args) {
        /**带有帧头帧尾校验转义等原始数据*/
        String hexStr = "7B60390000491E11AA20110B1B081522B500620010FD47FF5CFCDA00220732107700010000000F3C260088F77D";

        /**
         *  step01:
         *    转化为二进制
         */
        byte[] paramArrayOfByte = HexParser.parseHexStr2Byte(hexStr);

        /**
         * step02:
         *   转化为int[]
         */
        JSONArray data = GetJSONArray(paramArrayOfByte);
        log.info("data = " + data.toString());

        int[] decodeData1 = new int[data.size()];
        for (int i = 0; i < data.size(); i++) {
            decodeData1[i] = data.getInt(i);
        }

        /**
         * step02:
         *   去除转义字符
         */
        //去转义字符解析 转义数据中包含407B,407D的数据    去除帧头帧尾
        int[] decodeData = parseDataFromEscape(decodeData1);

        /**
         * step02:
         *   判断帧长度是否合法
         */
        // 最小帧长
        if (decodeData.length < 13) {
            System.out.println(" length of frame is wrong. buffer.length < 13");
            return;
        }

        //数据域长度+固定帧长13=帧总长
        if (decodeData1[9] + 13 != decodeData.length) {
            System.out.println(" length of frame is wrong");
            return;
        }

        /**
         * step03:
         *   CRC循环校验
         */
        int crcResult = CRC16.calcCrc(decodeData, 1, decodeData.length - 3); //计算从flag到data的校验值
        int crcExcept = decodeData[decodeData.length - 3] * 256 + decodeData[decodeData.length - 2];//计算crc校验值
        if (crcResult != crcExcept) {
            log.info("crcResult=" + crcResult + ",crcExcept=" + crcExcept);
            //异常处理
            return;
        }

        /**
         * step04:
         *   去除帧头帧尾&转化为hexStr
         */
        String result = toHexString(decodeData, 1, decodeData.length - 3);
        log.info("result = " + result);

        /**
         * step05:
         *   比较是否一致
         */
        if (hexStr.contains(result)) {
            log.info("_16Str and hexStr are the same String.");
        }
    }

    /**
     * 对数据进行转义
     *
     * @param data
     * @return 解析后数据长度
     */
    public static int[] parseDataFromEscape(int[] data) {
        int j = 0;
        int lastIndex = data.length;

        for (int i = 0; i < lastIndex; i++, j++) {
            if (FC_ESCAPE == data[i]) {
                data[j] = (int) (data[i] ^ data[++i]);
            } else {
                data[j] = data[i];
            }
        }

        int[] result = Arrays.copyOfRange(data, 0, j);
        return result;
    }

    public static JSONArray GetJSONArray(byte[] byteArray) {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < byteArray.length; i++) {
            jsonArray.add(i, Integer.valueOf(byteArray[i] & 0xFF));
        }
        return jsonArray;
    }

    /**
     * 将字节数组转换为HEX字符串
     *
     * @param data
     * @return
     */
    public static String toHexString(int[] data, int start, int len) {
        StringBuilder sb = new StringBuilder();
        for (int i = start; i < len; i++) {
            String hex = Integer.toHexString(data[i] & 0xFF);
            if (hex.length() == 1) {
                hex = "0" + hex;
            }
            sb.append(hex.toUpperCase());
        }

        return sb.toString();
    }
}
