package com.mengka.springboot.coap_01.client;

import com.mengka.springboot.coap_01.Constant;
import org.eclipse.californium.core.CoapClient;
import org.eclipse.californium.core.CoapResponse;
import org.eclipse.californium.core.Utils;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

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
public class GETClient {

    private static final String URI_TEMPLATE = "coap://%s:%s/%s";

    /*
     * Application entry point.
     *
     */
    public static void main(String args[]) throws Exception {
        /**接口地址**/
        String coapUri = String.format(URI_TEMPLATE, Constant.host, Constant.port, Constant.path);

        URI uri = new URI(coapUri); // URI parameter of the request

        if (2 > 0) {

            // input URI from command line arguments
            try {
                uri = new URI(coapUri);
            } catch (URISyntaxException e) {
                System.err.println("Invalid URI: " + e.getMessage());
                System.exit(-1);
            }

            CoapClient client = new CoapClient(uri);

            CoapResponse response = client.get();

            if (response != null) {

                System.out.println(response.getCode());
                System.out.println(response.getOptions());
                if (args.length > 1) {
                    try (FileOutputStream out = new FileOutputStream(Constant.filePath)) {
                        out.write(response.getPayload());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.out.println(response.getResponseText());

                    System.out.println(System.lineSeparator() + "ADVANCED" + System.lineSeparator());
                    // access advanced API with access to more details through
                    // .advanced()
                    System.out.println(Utils.prettyPrint(response));
                }
            } else {
                System.out.println("No response received.");
            }

        } else {
            // display help
            System.out.println("Californium (Cf) GET Client");
            System.out.println("(c) 2014, Institute for Pervasive Computing, ETH Zurich");
            System.out.println();
            System.out.println("Usage : " + GETClient.class.getSimpleName() + " URI [file]");
            System.out.println("  URI : The CoAP URI of the remote resource to GET");
            System.out.println("  file: optional filename to save the received payload");
        }
    }

}
