package com.mengka.model;

import lombok.Data;

import java.io.Serializable;

/**
 * @author huangyy
 * @date 2017/09/23.
 */
@Data
public class UserDO implements Serializable{

    public UserDO(){}

    public UserDO(String id,String firstname, String lastname, String phone, String email) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
    }

    private String id;

    private String firstname;

    private String lastname;

    private String phone;

    private String email;
}
