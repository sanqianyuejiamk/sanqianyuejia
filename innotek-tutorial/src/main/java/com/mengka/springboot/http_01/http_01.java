package com.mengka.springboot.http_01;

import org.apache.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2018/01/18.
 */
public class http_01 {

    private static final String HEADER_CONTENT_TYPE = "Content-Type";

    private static final String CONTENT_TYPE_JSON = "application/json";

    public static void main(String[] args) throws Exception {
        Map<String, String> headerMap = new HashMap<>();
        headerMap.put(HEADER_CONTENT_TYPE, CONTENT_TYPE_JSON);

        String url = "http://127.0.0.1:8089/spms/gateway.do";
        HttpResponse httpResponse = HttpClientUtil.post(url, headerMap, null);
        String responseBody = HttpClientUtil.getHttpResponseBody(httpResponse);
        System.out.println("------------, responseBody = " + responseBody);
        System.out.println("成功下发命令 {} " + httpResponse.getStatusLine() + ", responseBody = {}" + responseBody);

    }
}
