package com.bmwcatalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class FullCarDTO {
    private int id;
    private String name;
    private String generation;
    private String description;
    private int yearStart;
    private String bodyType;
    private String engine;
    private int powerHp;
    private String transmission;
    private String drive;
    private Double acceleration;
    private int maxSpeed;
    private Double fuelConsumption;

}
