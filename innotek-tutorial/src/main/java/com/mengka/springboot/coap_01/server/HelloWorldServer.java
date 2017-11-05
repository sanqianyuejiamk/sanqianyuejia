package com.mengka.springboot.coap_01.server;

import com.mengka.springboot.util.TimeUtil;
import org.eclipse.californium.core.CoapResource;
import org.eclipse.californium.core.CoapServer;
import org.eclipse.californium.core.network.CoapEndpoint;
import org.eclipse.californium.core.network.EndpointManager;
import org.eclipse.californium.core.network.config.NetworkConfig;
import org.eclipse.californium.core.server.resources.CoapExchange;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.SocketException;
import java.util.Date;

/**
 * COAP协议：
 *  https://github.com/eclipse/californium
 *
 * Getting started:
 * https://iot.eclipse.org/getting-started#
 * https://projects.eclipse.org/projects/technology.californium
 *
 * @author huangyy
 * @date 2017/11/06.
 */
public class HelloWorldServer extends CoapServer {

    private static final int COAP_PORT = NetworkConfig.getStandard().getInt(NetworkConfig.Keys.COAP_PORT);

    /*
     * Application entry point.
     */
    public static void main(String[] args) {

        try {

            // create server
            HelloWorldServer server = new HelloWorldServer();
            // add endpoints on all IP addresses
            server.addEndpoints();
            server.start();

        } catch (SocketException e) {
            System.err.println("Failed to initialize server: " + e.getMessage());
        }
    }

    /**
     * Add individual endpoints listening on default CoAP port on all IPv4 addresses of all network interfaces.
     */
    private void addEndpoints() {
        for (InetAddress addr : EndpointManager.getEndpointManager().getNetworkInterfaces()) {
            // only binds to IPv4 addresses and localhost
            if (addr instanceof Inet4Address || addr.isLoopbackAddress()) {
                InetSocketAddress bindToAddress = new InetSocketAddress(addr, COAP_PORT);
                addEndpoint(new CoapEndpoint(bindToAddress));
            }
        }
    }

    /*
     * Constructor for a new Hello-World server. Here, the resources
     * of the server are initialized.
     */
    public HelloWorldServer() throws SocketException {

        // provide an instance of a Hello-World resource
        add(new HelloWorldResource());
    }

    /*
     * Definition of the Hello-World Resource
     */
    class HelloWorldResource extends CoapResource {

        public HelloWorldResource() {

            // set resource identifier
            super("helloWorld");

            // set display name
            getAttributes().setTitle("Hello-World Resource");
        }

        @Override
        public void handleGET(CoapExchange exchange) {

            // respond to the request
            exchange.respond("Hello World! ["+ TimeUtil.toDate(new Date(),TimeUtil.FORMAT_YYYY_MM_DD_HH_MM_SS));
        }
    }
}
