package com.bmwcatalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactsUserDTO {
    private int id;
    private String name;
    private String email;
    private String phone;
    private boolean flag;
}
