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
 * 》》CoAP是受限制的应用协议(Constrained Application Protocol)：
 * 1.CoAP是一种物联网应用层协议，它运行于UDP协议之上；
 * 2.和HTTP协议采用文本首部不同，CoAP协议采用完全的二进制首部，这使得CoAP协议的首部更短，传输效率更高；
 * 3.CoAP协议为受限制设备而生，一个内存仅有20KB的单片机也可以实现CoAP服务器或客户端；
 * 4.CoAP事务处理机制；
 *
 * 》》支持受限制的物联网场景；
 *
 *
 * 》》CoAP块传输：
 *  CoAP协议的特点是传输的内容小巧精简，但是在某些情况下不得不传输较大的数据。
 *  在这种情况下可以使用CoAP协议中的某个选项设定分块传输的大小，那么无论是服务器或客户端可完成分片和组装这两个动作。
 *
 * 》》CoAP协议及开源实现：
 * http://blog.csdn.net/tulun/article/details/8869241
 *
 * 》》调试：
 * 使用Copper插件和Wireshark调试CoAP；
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
