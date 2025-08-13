package com.bmwcatalog.controller;

import com.bmwcatalog.dto.CarListDTO;
import com.bmwcatalog.service.CarService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MainControllerTest {
    @Mock
    private CarService carService;

    @InjectMocks
    private MainController mainController;


    @Test
    void getCarByNameTest() {
        String modelName = "M1";
        CarListDTO dto = new CarListDTO();
        dto.setName(modelName);

        when(carService.findByName(modelName)).thenReturn(List.of(dto));

        List<CarListDTO> result = mainController.getCarByName(modelName);

        assertEquals(1, result.size());
        assertEquals("M1", result.get(0).getName());
    }
}