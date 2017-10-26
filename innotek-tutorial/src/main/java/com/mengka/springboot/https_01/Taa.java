package com.mengka.springboot.https_01;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * @author huangyy
 * @date 2017/10/24.
 */
@Slf4j
public class Taa {

    public static void main(String[] args) {
        String token_url = Constant.host_url + Constant.REFRESH_TOKEN_V2;

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("appId", Constant.appid);
        map.put("secret", Constant.secret);
        map.put("refreshToken", Constant.REFRESH_TOKEN);

        String result = HttpsClientUtil.doPost(token_url, map, Constant.API_REFRESH_TOKEN);
        log.info("result = {}",result);
    }
}
