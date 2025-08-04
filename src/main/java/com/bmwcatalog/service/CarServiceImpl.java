package com.bmwcatalog.service;


import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.dto.FullCarDTO;
import com.bmwcatalog.entity.CarEntity;
import com.bmwcatalog.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
                .map(car -> new CarListDTO(car.getId(), car.getName(), car.getGeneration()))
                .toList();

        return carListDTO;
    }

    @Override
    public FullCarDTO findById(int id) {
        Optional<CarEntity> carEntityOpt = carRepository.findById(id);
        if (carEntityOpt.isPresent()) {
            CarEntity carEntity = carEntityOpt.get();
            return new FullCarDTO(
                    carEntity.getId(),
                    carEntity.getName(),
                    carEntity.getGeneration(),
                    carEntity.getDescription(),
                    carEntity.getYearStart(),
                    carEntity.getBodyType(),
                    carEntity.getEngine(),
                    carEntity.getPowerHp(),
                    carEntity.getTransmission(),
                    carEntity.getDrive(),
                    carEntity.getAcceleration(),
                    carEntity.getMaxSpeed(),
                    carEntity.getFuelConsumption());
        }
        return null;
    }
}
