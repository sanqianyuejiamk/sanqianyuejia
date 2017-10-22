package com.mengka.springboot;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import com.mengka.springboot.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Rule;
import org.junit.Test;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

/**
 * @author huangyy
 * @date 2017/10/22.
 */
@Slf4j
public class wireMockServer_01 {

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(8089);

    /**
     *  http://127.0.0.1:8089/v1/kv/a1
     *
     * @throws Exception
     */
    @Test
    public void start_api_server() throws Exception {
        log.info("start_api_server start..");

        //启动虚拟服务
        startApiServer();

        Thread.sleep(600000);

        log.info("start_api_server end..");
    }

    public void startApiServer(){
        String wireMockResult = getApiServerResult();

        stubFor(get(urlMatching("/v1/kv/.*"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody(wireMockResult)));
    }

    public String getApiServerResult(){
        String filePath = "/Users/hyy044101331/work_springcloud/work_sanqianyuejia/sanqianyuejia/innotek-tutorial/src/main/resources/data3.txt";
        return FileUtil.readAll(filePath);
    }
}
