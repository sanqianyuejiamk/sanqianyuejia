package com.mengka.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author huangyy
 * @date 2018/01/03.
 */
public class ChineseUnicodeUtil {

    public static String chinese2Unicode(String str) {
        StringBuilder sb = new StringBuilder();
        for (char c : str.toCharArray()) {
            if (isChinese(c)) {
                sb.append("\\u" + Integer.toHexString(c));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    public static boolean isChinese(char c) {
        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
        if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
                || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
                || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
                || ub == Character.UnicodeBlock.GENERAL_PUNCTUATION
                || ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
                || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS) {
            return true;
        }
        return false;
    }

    public static String unicodeToString(String str) {
        Pattern pattern = Pattern.compile("(\\\\u(\\p{XDigit}{4}))");
        Matcher matcher = pattern.matcher(str);
        char ch;
        while (matcher.find()) {
            String result = matcher.group(2);
            ch = (char) Integer.parseInt(result, 16);
            str = str.replace(matcher.group(1), ch + "");
        }
        return str;
    }
}
