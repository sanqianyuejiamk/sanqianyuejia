package com.mengka.springboot.SSLSocke_01.server;

import com.mengka.springboot.SSLSocke_01.Constants;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.security.KeyStore;
import java.security.cert.X509Certificate;
import javax.net.ssl.HandshakeCompletedEvent;
import javax.net.ssl.HandshakeCompletedListener;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLPeerUnverifiedException;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;

/**
 *  单向认证
 *  1)server侧只需要自己的keystore文件，不需要truststore文件;
 *  2)client侧不需要自己的keystore文件，只需要truststore文件（其中包含server的公钥）;
 *
 *  此外server侧需要在创建SSLServerSocket之后设定不需要客户端证书：setNeedClientAuth(false);
 *
 */
public class CatServerNoClientAuth implements Runnable, HandshakeCompletedListener {

    private final Socket _s;

    public CatServerNoClientAuth(Socket s) {
        _s = s;
    }

    public static void main(String[] args) throws Exception {

        KeyStore serverKeyStore = KeyStore.getInstance("JKS");
        serverKeyStore.load(new FileInputStream(Constants.serverKeyStoreFile), Constants.serverKeyStorePwd.toCharArray());

        KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        kmf.init(serverKeyStore, Constants.catServerKeyPwd.toCharArray());

        SSLContext sslContext = SSLContext.getInstance("TLSv1");
        sslContext.init(kmf.getKeyManagers(), null, null);

        SSLServerSocketFactory sslServerSocketFactory = sslContext.getServerSocketFactory();
        SSLServerSocket sslServerSocket = (SSLServerSocket) sslServerSocketFactory.createServerSocket(Constants.SERVER_PORT);
        sslServerSocket.setNeedClientAuth(false);

        while (true) {
            SSLSocket s = (SSLSocket) sslServerSocket.accept();
            CatServerNoClientAuth cs = new CatServerNoClientAuth(s);
            s.addHandshakeCompletedListener(cs);
            new Thread(cs).start();
        }
    }

    @Override
    public void run() {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(_s.getInputStream()));
            PrintWriter writer = new PrintWriter(_s.getOutputStream(), true);

            writer.println("Welcome~, enter exit to leave.");
            String s;
            while ((s = reader.readLine()) != null && !s.trim().equalsIgnoreCase("exit")) {
                writer.println("Echo: " + s);
            }
            writer.println("Bye~");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                _s.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void handshakeCompleted(HandshakeCompletedEvent event) {
        try {
            X509Certificate cert = (X509Certificate) event.getPeerCertificates()[0];
        } catch (SSLPeerUnverifiedException ex) {
            System.out.println("handshakeCompleted, SSLPeerUnverified.");
        }
    }
}