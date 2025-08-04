package com.bmwcatalog.service;

import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.entity.CarEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CarService {

    List<CarListDTO> findByName(String name);
}
