package com.bmwcatalog.service;

import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.dto.FullCarDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CarService {

    List<CarListDTO> findByName(String name);
    FullCarDTO findById(int id);
}
