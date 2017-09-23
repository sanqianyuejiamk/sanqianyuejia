package com.mengka.hessian.service.impl;

import com.mengka.hessian.service.MengkaService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import java.util.Arrays;
import java.util.List;

/**
 * @author mengka
 * @description
 * @data 2016/10/05.
 */
public class MengkaServiceImpl implements MengkaService {

    private static final Log log = LogFactory.getLog(MengkaServiceImpl.class);

    public List<String> getMengkaList() {
        log.info("MengkaService getMengkaList invoke..");
        return Arrays.asList(new String[]{"mengka AAA","mengka BBB","mengka CCC"});
    }
}
