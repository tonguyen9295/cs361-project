package com.example.conversion;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ConversionExceptionHandler {

    @ExceptionHandler(ConversionException.class)
    public ResponseEntity<String> handleConversionException(ConversionException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}