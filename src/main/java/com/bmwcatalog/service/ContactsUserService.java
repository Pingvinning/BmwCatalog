package com.bmwcatalog.service;

import com.bmwcatalog.dto.ContactsUserDTO;
import com.bmwcatalog.entity.ContactsUserEntity;

import java.util.List;

public interface ContactsUserService {
    void save(ContactsUserEntity contactsUserEntity);

    List<ContactsUserDTO> findAll();
    public ContactsUserDTO toggleFlag(int id);
}
