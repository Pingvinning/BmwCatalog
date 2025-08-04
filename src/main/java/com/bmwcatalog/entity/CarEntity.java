package com.bmwcatalog.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "models")
@NoArgsConstructor
@Data
public class CarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String generation;
    private String description;
    @Column(name = "year_start")
    private int yearStart;
    @Column(name = "body_type")
    private String bodyType;
    private String engine;
    @Column(name = "power_hp")
    private int powerHp;
    private String transmission;
    private String drive;
    private Double acceleration;
    @Column(name = "max_speed")
    private int maxSpeed;
    @Column(name = "fuel_consumption")
    private Double fuelConsumption;
}
