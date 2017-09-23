package com.mengka.manager;

import com.mengka.model.UserDO;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

/**
 * @author huangyy
 * @date 2017/09/23.
 */
@Component
public class UserManager {

    public List<UserDO> initUserData(){
        List<UserDO> list = new ArrayList<UserDO>();
        list.add(new UserDO("205310","mike","a chicken1","13018955100","110@163.com"));
        list.add(new UserDO("205311","mike","a chicken2","13018955101","111@163.com"));
        list.add(new UserDO("205312","mike","a chicken3","13018955102","112@163.com"));
        list.add(new UserDO("205313","mike","a chicken4","13018955103","113@163.com"));
        list.add(new UserDO("205314","mike","a chicken5","13018955104","114@163.com"));
        return list;
    }
}
