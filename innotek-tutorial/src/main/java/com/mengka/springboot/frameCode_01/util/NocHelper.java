package com.mengka.springboot.frameCode_01.util;

import java.util.Calendar;
import java.util.Date;
import java.util.Formatter;

/**
 * 消息工具类
 *
 * @author ZHY
 * @version MsgCollect1.0, 2016/6/7
 * @since MsgCollect1.0
 */
public class NocHelper {

    public static Date toDate(int year, int month, int day) {
        Calendar time = Calendar.getInstance();
        time.clear();
        time.set(Calendar.YEAR, year);
        time.set(Calendar.MONTH, month - 1);
        time.set(Calendar.DAY_OF_MONTH, day);
        return time.getTime();
    }

    public static Date toDate(int year, int month, int day, int hour, int minute, int second) {
        Calendar time = Calendar.getInstance();
        time.clear();
        time.set(Calendar.YEAR, year);
        time.set(Calendar.MONTH, month - 1);
        time.set(Calendar.DAY_OF_MONTH, day);
        time.set(Calendar.HOUR, hour);
        time.set(Calendar.MINUTE, minute);
        time.set(Calendar.SECOND, second);
        return time.getTime();
    }

    /**
     * 将字节数组转换为HEX字符串
     *
     * @param data
     * @return
     */
    public static String toPrintHexString(byte[] data) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < data.length; i++) {
            String hex = Integer.toHexString(data[i] & 0xFF);
            if (hex.length() == 1) {
                hex = "0" + hex;
            }
            sb.append(hex.toUpperCase());
            sb.append(" ");
        }

        return sb.toString();
    }

    public static String byteArray2Hex(final byte[] bytes) {
        @SuppressWarnings("resource")
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02X", b);
        }
        return formatter.toString();
    }


    /**
     * 将字节数组转换为HEX字符串
     *
     * @param data
     * @return
     */
    public static String toPrintHexString(int[] data, int start, int len) {
        StringBuilder sb = new StringBuilder();
        for (int i = start; i < len; i++) {
            String hex = Integer.toHexString(data[i] & 0xFF);
            if (hex.length() == 1) {
                hex = "0" + hex;
            }
            sb.append(hex.toUpperCase());
            sb.append(" ");
        }

        return sb.toString();
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


    /**
     * 16进制字符串转换为字节数组
     *
     * @param hexString
     * @return
     */
    public static byte[] toBytes(String hexString) {
        if (null == hexString || "".equals(hexString)) {
            return null;
        }

        int length = hexString.length() / 2;

        byte[] result = new byte[length];

        for (int i = 0; i < length; i++) {
            int pos = i * 2;

            result[i] = (byte) Integer.parseInt(hexString.substring(pos, pos + 2), 16);
        }
        return result;
    }

    /**
     * 将长整形数据转换为字节
     *
     * @param data
     * @return
     */
    public static byte[] toBytes(long data) {
        byte[] result = new byte[4];

        long temp = data;
        for (int i = 0; i < result.length; i++) {
            result[i] = new Long(temp & 0xff).byteValue();
            temp = temp >> 8;
        }
        return result;
    }

    /**
     * 将整形数据转换为字节
     *
     * @param data
     * @return
     */
    public static byte[] toBytes(int data) {
        byte[] result = new byte[2];

        long temp = data;
        for (int i = 0; i < result.length; i++) {
            result[i] = new Long(temp & 0xff).byteValue();
            temp = temp >> 8;
        }
        return result;
    }


    public static void convertToBytes(long data, byte[] result,
                                      int startIndex, int len) {
        long temp = data;
        for (int i = 0; i < len; i++) {
            result[startIndex + i] = new Long(temp & 0xff).byteValue();
            temp = temp >> 8;
        }
    }

    /**
     * 格式化字符串
     *
     * @param format
     * @param args
     * @return
     */
    public static String formatString(String format, Object... args) {
        @SuppressWarnings("resource")
        Formatter formatter = new Formatter();
        return formatter.format(format, args).toString();
    }


    /**
     * 将数据转换为软件版本号
     * 例如0x11表示1.01，最大可表示15.15
     *
     * @param data
     * @return
     */
    public static String getFormatVersion(int data) {
        return String.valueOf(data & 0xf0)
                + "." + String.valueOf(data & 0x0f);
    }

    /**
     * 将地址转换为8进制
     * 例如0x11表示1.01，最大可表示15.15
     *
     * @param data
     * @return
     */
    public static String getFormatAddress(long address) {
        return formatString("%08X", address);
    }

    /**
     * 将NETIN数组转换为字符串
     *
     * @param netIn
     * @return
     */
    public static String getFormatNetIn(int[] netIn) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < netIn.length; i++) {
            if (0 != i) {
                result.append(",");
            }
            result.append(netIn[i]);
        }
        return result.toString();
    }

    public static String convert(int[] data) {
        StringBuilder sb = new StringBuilder(data.length);
        for (int i = 0; i < data.length; ++i) {
            if (data[i] < 0) {
                throw new IllegalArgumentException();
            }
            sb.append((char) data[i]);
        }
        return sb.toString();
    }

    public static int asUnsignedByte(byte data) {
        return data & 0x0FF;
    }

    public static int asUnsignedShort(short data) {
        return data & 0x0FFFF;
    }

    public static long asUnsignedInt(int data) {
        return data & 0x0FFFFFFFFl;
    }
}
