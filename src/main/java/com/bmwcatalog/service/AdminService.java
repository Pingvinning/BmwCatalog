package com.bmwcatalog.service;

import com.bmwcatalog.entity.Admins;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {
    UserDetails loadUserByUsername(String username);
    void addAdmin(Admins admin);
}
