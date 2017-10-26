package com.mengka.springboot.SSLSocke_02.client;

import com.mengka.springboot.SSLSocke_02.Constants;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.security.KeyStore;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManagerFactory;

public class FoxClient {

    /**
     *  client处理流程
     *  1）加载client的keystore文件；
     *  2）加载client的truststore文件；
     *  3) 创建KeyManagerFactory对象并初始化；
     *  4) 创建TrustManagerFactory对象并初始化。truststore中存的是server的公钥，不需要keypass也可以访问；
     *  5）创建SSLContext并用3）和4）中创建的KeyManagerFactory和TrustManagerFactory对象来初始化；
     *  6）创建SSLSocketFactory，在指定的网络地址和端口上创建SSLSocket；
     *  7）在这个SSLSocket对象的输入输出流上进行读写；
     *
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        KeyStore clientKeyStore = KeyStore.getInstance("JKS");
        clientKeyStore.load(new FileInputStream(Constants.clientKeyStoreFile), Constants.clientKeyStorePwd.toCharArray());

        KeyStore clientTrustKeyStore = KeyStore.getInstance("JKS");
        clientTrustKeyStore.load(new FileInputStream(Constants.clientTrustKeyStoreFile), Constants.clientTrustKeyStorePwd.toCharArray());

        KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        kmf.init(clientKeyStore, Constants.foxclientKeyPwd.toCharArray());

        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(clientTrustKeyStore);

        SSLContext sslContext = SSLContext.getInstance("TLSv1");
        sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);

        SSLSocketFactory socketFactory = sslContext.getSocketFactory();
        Socket socket = socketFactory.createSocket("localhost", Constants.SERVER_PORT);

        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        send("hello", out);
        send("exit", out);
        receive(in);
        socket.close();
    }

    public static void send(String s, PrintWriter out) throws IOException {
        System.out.println("Sending: " + s);
        out.println(s);
    }

    public static void receive(BufferedReader in) throws IOException {
        String s;
        while ((s = in.readLine()) != null) {
            System.out.println("Reveived: " + s);
        }
    }
}