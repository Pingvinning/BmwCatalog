package com.bmwcatalog.repository;

import com.bmwcatalog.entity.ContactsUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactsUserRepository extends JpaRepository<ContactsUserEntity,Integer> {
}
