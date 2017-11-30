package com.mengka.springboot.StringTokenizer_01;

import com.alibaba.fastjson.JSON;

import java.util.StringTokenizer;

/**
 * @author huangyy
 * @date 2017/11/27.
 */
public class Taa {

    public static void main(String[] args) {
        String sensorData = "123,96,57,0,0,68,58,17,170,32,17,9,28,21,23,56,168,0,164,0,24,251,199,254,146,255,227,0,238,7,50,16,119,29,0,0,0,0,26,60,37,0,34,153,125";

        int[] data = new int[sensorData.length()];
        StringTokenizer toKenizer = new StringTokenizer(sensorData, ",");
        int i = 0;
        while (toKenizer.hasMoreElements()) {
            data[i++] = Integer.valueOf(toKenizer.nextToken());
        }
        System.out.println("data = " + JSON.toJSONString(data));
    }
}
