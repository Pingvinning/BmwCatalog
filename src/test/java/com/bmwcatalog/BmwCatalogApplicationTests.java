package com.bmwcatalog;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;


class BmwCatalogApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void concatTest(){
        String a = "Hello ";
        String b = "World";
        assertEquals("Hello World", a+b);
    }
}
