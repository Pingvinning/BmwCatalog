package com.bmwcatalog.service;

import com.bmwcatalog.dto.ContactsUserDTO;
import com.bmwcatalog.entity.ContactsUserEntity;
import com.bmwcatalog.repository.ContactsUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class ContactsUserServiceImpl implements ContactsUserService {

    @Autowired
    private ContactsUserRepository contactsUserRepository;

    @Override
    public void save(ContactsUserEntity contactsUserEntity) {
        contactsUserRepository.save(contactsUserEntity);
    }

    @Override
    public List<ContactsUserDTO> findAll() {
        List<ContactsUserEntity> contactsUserEntities = contactsUserRepository.findAll();
        List<ContactsUserDTO> contactsUserDTOs = contactsUserEntities
                .stream()
                .map(contacts -> new ContactsUserDTO(
                        contacts.getId(),
                        contacts.getName(),
                        contacts.getEmail(),
                        contacts.getPhone(),
                        contacts.isFlag()))
                .toList();
        return contactsUserDTOs;
    }


    @Override
    public ContactsUserDTO toggleFlag(int id) {
        ContactsUserEntity entity = contactsUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        entity.setFlag(!entity.isFlag());
        contactsUserRepository.save(entity);

        return new ContactsUserDTO(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.isFlag()
        );
    }
}
