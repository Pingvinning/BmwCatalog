package com.bmwcatalog.controller;

import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.dto.ContactsUserDTO;
import com.bmwcatalog.dto.FullCarDTO;
import com.bmwcatalog.entity.ContactsUserEntity;
import com.bmwcatalog.service.CarService;
import com.bmwcatalog.service.ContactsUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Tag(name = "main_controller")
@RestController
@RequestMapping("/bmw")
public class MainController {

    @Autowired
    private CarService carService;

    @Autowired
    private ContactsUserService contactsUserService;

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
    private List<ContactsUserDTO> getContacts(){
        return contactsUserService.findAll();
    }

    @PatchMapping("/admin/contacts/{id}/flag")
    public ContactsUserDTO toggleFlag(@PathVariable int id) {
        return contactsUserService.toggleFlag(id);
    }

}
