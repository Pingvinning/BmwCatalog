package com.bmwcatalog.service;


import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.entity.CarEntity;
import com.bmwcatalog.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    @Autowired
    public CarRepository carRepository;

    @Override
    public List<CarListDTO> findByName(String name) {
        List<CarEntity> carEntity = carRepository.findByName(name);
        if (carEntity == null) {
            return null;
        }

        List<CarListDTO> carListDTO = carEntity.stream()
                .map(car -> new CarListDTO(car.getId(),car.getName(),car.getGeneration()))
                .toList();

        return carListDTO;
    }
}
