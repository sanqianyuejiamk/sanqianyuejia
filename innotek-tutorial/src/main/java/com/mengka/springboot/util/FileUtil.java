package com.mengka.springboot.util;

import lombok.extern.log4j.Log4j2;

import java.io.*;
import java.util.Scanner;

/**
 * @author huangyy
 * @date 2017/10/22.
 */
@Log4j2
public class FileUtil {

    /**
     * 按行读取文件内容，返回 Scanner
     *
     * @param fileString 输入文件的存放路径
     * @return
     */
    public static Scanner mkReadFile(String fileString) {
        File f = new File(fileString);
        InputStream st = null;
        try {
            st = new FileInputStream(f);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        Scanner in = new Scanner(st);
        return in;
    }

    public static String readAll(String path) {
        String result = "";
        StringBuffer stringBuffer = new StringBuffer();
        try {
            InputStreamReader inputStreamReader = new InputStreamReader(
                    new FileInputStream(path));
            BufferedReader bufferedReader = new BufferedReader(
                    inputStreamReader);
            stringBuffer = new StringBuffer();
            int str;
            while ((str = bufferedReader.read()) != -1) {
                stringBuffer.append((char) str);
            }
            result = stringBuffer.toString();
        } catch (Exception e) {
            log.error(e);
        }
        return result;
    }
}
