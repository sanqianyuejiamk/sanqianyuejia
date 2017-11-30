package com.mengka.springboot.frameCode_04;

import com.mengka.springboot.frameCode_02.HexParser;
import lombok.extern.log4j.Log4j2;
import net.sf.json.JSONArray;

/**
 * @author huangyy
 * @date 2017/11/27.
 */
@Log4j2
public class _16parse_01 {

    public static void main(String[] args) {
        String _16Str = "60390000443A11AA2011091C151738A800A40018FBC7FE92FFE300EE073210771D000000001A3C2500";

        /**
         *  step01:
         *    转化为二进制
         */
        byte[] paramArrayOfByte = HexParser.parseHexStr2Byte(_16Str);

        /**
         * step02:
         *   转化为int[]
         */
        JSONArray data = GetJSONArray(paramArrayOfByte);
        log.info("data = " + data.toString());

        int[] data1 = new int[data.size()];
        for (int i = 0; i < data.size(); i++) {
            data1[i] = data.getInt(i);
        }

        /**
         * step03:
         *   转化为hexStr
         */
        String hexStr = toHexString(data1, 0, data1.length);
        log.info("hexStr = " + hexStr);

        /**
         * step04:
         *   比较是否一致
         */
        if(_16Str.equals(hexStr)){
            log.info("_16Str and hexStr are the same String.");
        }
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

    public static JSONArray GetJSONArray(byte[] byteArray) {
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < byteArray.length; i++) {
            jsonArray.add(i, Integer.valueOf(byteArray[i] & 0xFF));
        }
        return jsonArray;
    }
}
