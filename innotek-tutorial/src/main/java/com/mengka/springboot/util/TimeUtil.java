package com.mengka.springboot.util;


import org.apache.commons.lang.StringUtils;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class TimeUtil {

    public static final String FORMAT_YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";

    public static final String FORMAT_YYYYMMDDHHMMSS = "yyyyMMddHHmmss";

    public static final String FORMAT_YYYYMMDD = "yyyyMMdd";

    public static final String FORMAT_YYYYMMDD2 = "yyyy-MM-dd";

    public static final String FORMAT_MMDD = "MM月dd日";


    public static String toDate(Date dt, String sFmt) {
        if (null == dt || StringUtils.isBlank(sFmt)) {
            return null;
        }
        SimpleDateFormat sdfFrom = null;
        String sRet = null;
        try {
            sdfFrom = new SimpleDateFormat(sFmt);
            sRet = sdfFrom.format(dt).toString();
        } catch (Exception ex) {
            return null;
        } finally {
            sdfFrom = null;
        }
        return sRet;
    }

    public static int toDateInt(Date dt, String sFmt) {
        return Integer.parseInt(toDate(dt, sFmt));
    }

    public static Date toDate(String sDate, String sFmt) {
        if (StringUtils.isBlank(sDate) || StringUtils.isBlank(sFmt)) {
            return null;
        }

        SimpleDateFormat sdfFrom = null;
        Date dt = null;
        try {
            sdfFrom = new SimpleDateFormat(sFmt);
            dt = sdfFrom.parse(sDate);
        } catch (Exception ex) {
            return null;
        } finally {
            sdfFrom = null;
        }

        return dt;
    }

    public static Date toDate(Integer intDate, String sFmt) {
        return toDate(String.valueOf(intDate), sFmt);
    }

    public static Date dayBefore(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendar.DATE, -14);
        return calendar.getTime();
    }

    public static Date dayBefore(Date date, int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(calendar.DATE, days);
        return calendar.getTime();
    }

    public static boolean isValidDate(String str, String sFmt) {
        boolean convertSuccess = true;
        SimpleDateFormat format = new SimpleDateFormat(sFmt);
        try {
            format.setLenient(false);
            format.parse(str);
        } catch (ParseException e) {
            convertSuccess = false;
        }
        return convertSuccess;
    }

    public static boolean isValidDate(int date) {
        return isValidDate(String.valueOf(date), FORMAT_YYYYMMDD);
    }

    public static long delDate(int startDateId, int endDateId) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        return (sdf.parse(String.valueOf(startDateId)).getTime() - sdf.parse(String.valueOf(endDateId)).getTime()) / (24 * 60 * 60 * 1000);
    }

    public static int getDiscrepantDays(Date dateStart, Date dateEnd) {
        return (int) ((dateEnd.getTime() - dateStart.getTime()) / 1000 / 60 / 60 / 24);
    }

    /**
     *  协调世界时（英：Coordinated Universal Time)，又称世界统一时间，世界标准时间
     *
     * 1.协调世界时是以原子时秒长为基础，在时刻上尽量接近于世界时的一种时间计量系统。
     * 2.中国大陆、中国香港、中国澳门、中国台湾、蒙古国、新加坡、马来西亚、菲律宾、西澳大利亚州的时间与UTC的时差均为+8，也就是UTC+8。
     *
     * @param time
     * @return
     */
    public static long getUTCTime(Date time){
        Calendar calendar = Calendar.getInstance();


        // 取得时间偏移量：
        int zoneOffset = calendar.get(java.util.Calendar.ZONE_OFFSET);
        // 取得夏令时差：
        int dstOffset = calendar.get(java.util.Calendar.DST_OFFSET);

        calendar.setTime(time);
        // 从本地时间里扣除这些差量，即可以取得UTC时间：
        calendar.add(java.util.Calendar.MILLISECOND, -(zoneOffset + dstOffset));
        long mills = calendar.getTimeInMillis();

        return mills;
    }
}
