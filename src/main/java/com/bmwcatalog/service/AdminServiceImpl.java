package com.bmwcatalog.service;

import com.bmwcatalog.config.AdminDetails;
import com.bmwcatalog.entity.Admins;
import com.bmwcatalog.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl implements UserDetailsService, AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admins> admin = adminRepository.findByUsername(username);
        return admin.map(AdminDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Override
    public void addAdmin(Admins admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
    }
}
