package com.bmwcatalog.controller;

import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bmw")
public class MainController {

    @Autowired
    private CarService carService;

    @GetMapping("/models/{name}")
    public List<CarListDTO> getCarByName(@PathVariable String name) {
        return carService.findByName(name);
    }

}
