package com.mengka.springboot.coap_02.client;

import com.mengka.springboot.coap_02.Constant;
import com.mengka.springboot.https_iotapp_08.HttpsClientUtil;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.californium.core.CoapClient;
import org.eclipse.californium.core.CoapResponse;
import org.eclipse.californium.core.Utils;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * ==[ CoAP Response ]============================================
 * MID    : 32792
 * Token  : 504ae16506bef245
 * Type   : ACK
 * Status : 2.05
 * Options: {"Content-Format":"text/plain"}
 * Payload: 33 Bytes
 * ---------------------------------------------------------------
 * Hello World! [2017-11-06 01:15:18
 * ===============================================================
 *
 * @author huangyy
 * @date 2017/11/06.
 */
@Slf4j
public class GETClient {

    private static final String URI_TEMPLATE = "coap://%s:%s/%s";

    /*
     * Application entry point.
     *
     */
    public static void main(String args[]) throws Exception {
        /**接口地址**/
        String coapUri = String.format(URI_TEMPLATE, Constant.host, Constant.port, Constant.api_register);

        Map<String, Object> params = new HashMap<>();
        params.put("ep", "863703030135485");
        params.put("lt", "86400");//默认值为86400 s（24小时）
        coapUri = HttpsClientUtil.setGetParams(coapUri, params);
//        coapUri = coapUri + "&</1/1>";

        URI uri = new URI(coapUri); // URI parameter of the request

        // input URI from command line arguments
        try {
            uri = new URI(coapUri);
        } catch (URISyntaxException e) {
            log.error("Invalid URI: " + e.getMessage());
            System.exit(-1);
        }

        CoapClient client = new CoapClient(uri);

        CoapResponse response = client.get();

        if (response != null) {

            log.info("getCode = " + response.getCode());
            log.info("getOptions = " + response.getOptions());
            if (args.length > 1) {
                try (FileOutputStream out = new FileOutputStream(Constant.filePath)) {
                    out.write(response.getPayload());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                log.info(response.getResponseText());

                log.info(System.lineSeparator() + "ADVANCED" + System.lineSeparator());
                // access advanced API with access to more details through
                // .advanced()
                log.info(Utils.prettyPrint(response));
            }
        } else {
            log.info("No response received.");
        }
    }
}
