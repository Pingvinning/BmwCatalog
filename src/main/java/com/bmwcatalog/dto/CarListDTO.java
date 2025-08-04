package com.bmwcatalog.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarListDTO {
    private int id;
    private String name;
    private String generation;
}

