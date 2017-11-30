package com.mengka.springboot.frameCode_01;

import com.alibaba.fastjson.JSON;
import com.mengka.springboot.frameCode_01.decode.NbFrameHead;
import com.mengka.springboot.frameCode_01.decode.NbSensorDataFrame;
import com.mengka.springboot.frameCode_01.decode.NocFrame;
import lombok.extern.slf4j.Slf4j;

/**
 * @author huangyy
 * @date 2017/11/06.
 */
@Slf4j
public class decode_01 {

    public static void main(String[] args) {

        String payload = "60390000443A11AA2011091C151738A800A40018FBC7FE92FFE300EE073210771D000000001A3C2500";

        //消息解析
        NocFrame frame = new NocFrame(payload);

        if (NocFrame.NocSensorType.NBSENSOR == frame.getSensorType()) {
            NbFrameHead head = frame.getNbFrameHead();
            log.trace(head.toString());

            NbFrameHead nbHead = frame.getNbFrameHead();
            NbSensorDataFrame data = (NbSensorDataFrame) frame.getFrameBody();

            log.info("NB Sensor Address: " + nbHead.getAddr());
            log.info("Sensor Data: " + JSON.toJSONString(data));
        }
    }
}
