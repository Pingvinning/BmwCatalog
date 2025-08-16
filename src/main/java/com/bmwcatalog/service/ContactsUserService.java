package com.bmwcatalog.service;

import com.bmwcatalog.dto.ContactsUserDTO;
import com.bmwcatalog.entity.ContactsUserEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContactsUserService {
    void save(ContactsUserEntity contactsUserEntity);

    List<ContactsUserDTO> findAll();
    ContactsUserDTO toggleFlag(int id);
}
