package com.bmwcatalog.controller;

import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.dto.ContactsUserDTO;
import com.bmwcatalog.dto.FullCarDTO;
import com.bmwcatalog.entity.Admins;
import com.bmwcatalog.entity.ContactsUserEntity;
import com.bmwcatalog.service.AdminService;
import com.bmwcatalog.service.CarService;
import com.bmwcatalog.service.ContactsUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name = "main_controller")
@RestController
@RequestMapping("/bmw")
public class MainController {

    @Autowired
    private CarService carService;

    @Autowired
    private ContactsUserService contactsUserService;

    @Autowired
    private AdminService adminService;

    @GetMapping("/models/{name}")
    public List<CarListDTO> getCarByName(@PathVariable String name) {
        return carService.findByName(name);
    }

    @GetMapping("/models/id/{id}")
    public FullCarDTO getCarById(@PathVariable("id") int id) {
        return carService.findById(id);
    }

    @PostMapping("/contacts")
    public void addContacts(@RequestBody ContactsUserEntity contactsUserEntity) {
        contactsUserService.save(contactsUserEntity);
    }


    @GetMapping("/admin/contacts")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    private List<ContactsUserDTO> getContacts(){
        return contactsUserService.findAll();
    }

    @PatchMapping("/admin/contacts/{id}/flag")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ContactsUserDTO toggleFlag(@PathVariable int id) {
        return contactsUserService.toggleFlag(id);
    }


    @PostMapping("/new")
    public String newAdmin(@RequestBody Admins admin) {
        adminService.addAdmin(admin);
        return "Admin added";
    }

}
