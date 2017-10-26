package com.mengka.springboot.SSLSocke_02.server;


import com.mengka.springboot.SSLSocke_02.Constants;

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
import javax.net.ssl.TrustManagerFactory;


/**
 * keytool -genkey -v -alias tomcat -keyalg RSA -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/tomcat.keystore -validity 36500
 * keytool -genkey -v -alias mykey -keyalg RSA  -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/mykey.keystore -validity 36500
 * <p>
 * <p>
 * <p>
 * keytool -export -alias mykey -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/mykey.keystore -storepass 123456 -rfc -file /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/mykey.cer
 * keytool -import -v -file /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/mykey.cer -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/tomcattrust.keystore
 * <p>
 * <p>
 * keytool -list -keystore tomcat.keystore
 * keytool -list -keystore tomcattrust.keystore
 * <p>
 * <p>
 * <p>
 * keytool -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/tomcat.keystore -export -alias tomcat -file /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/tomcat.cer
 * keytool -import -v -file /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/tomcat.cer -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home/bin/mykeytrust.keystore
 * <p>
 * <p>
 * -keypass foxclient
 * -storepass foxclientks
 */
public class CatServer implements Runnable, HandshakeCompletedListener {

    public static final int SERVER_PORT = 11123;

    private final Socket _s;
    private String peerCerName;

    public CatServer(Socket s) {
        _s = s;
    }

    public static void main(String[] args) throws Exception {
        KeyStore serverKeyStore = KeyStore.getInstance("JKS");
        serverKeyStore.load(new FileInputStream(Constants.serverKeyStoreFile), Constants.serverKeyStorePwd.toCharArray());

        KeyStore serverTrustKeyStore = KeyStore.getInstance("JKS");
        serverTrustKeyStore.load(new FileInputStream(Constants.serverTrustKeyStoreFile), Constants.serverTrustKeyStorePwd.toCharArray());

        KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        kmf.init(serverKeyStore, Constants.catServerKeyPwd.toCharArray());

        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        tmf.init(serverTrustKeyStore);

        SSLContext sslContext = SSLContext.getInstance("TLSv1");
        sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);

        SSLServerSocketFactory sslServerSocketFactory = sslContext.getServerSocketFactory();
        SSLServerSocket sslServerSocket = (SSLServerSocket) sslServerSocketFactory.createServerSocket(SERVER_PORT);
        sslServerSocket.setNeedClientAuth(true);

        while (true) {
            SSLSocket s = (SSLSocket) sslServerSocket.accept();
            CatServer cs = new CatServer(s);
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
            writer.println("Bye~, " + peerCerName);
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
            peerCerName = cert.getSubjectX500Principal().getName();
        } catch (SSLPeerUnverifiedException ex) {
            ex.printStackTrace();
        }
    }

}