package com.bmwcatalog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CarGlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<CarGlobalExceptionInfo> handleException(CarGlobalException ex){
        CarGlobalExceptionInfo cgi = new CarGlobalExceptionInfo();
        cgi.setInfo(ex.getMessage());
        return new ResponseEntity<>(cgi, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<CarGlobalExceptionInfo> handleException(Exception ex){
        CarGlobalExceptionInfo cgi = new CarGlobalExceptionInfo();
        cgi.setInfo(ex.getMessage());
        return new ResponseEntity<>(cgi, HttpStatus.NOT_FOUND);
    }
}
