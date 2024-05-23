package com.example.conversion;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/convert")
public class ConversionController {

    private static final int DECIMAL_PLACES = 5;

    @GetMapping("/weight")
    public ResponseEntity<Double> convertWeight(
            @RequestParam("value") double value,
            @RequestParam("fromUnit") String fromUnit,
            @RequestParam("toUnit") String toUnit) {
        
        double result;
        
        switch (fromUnit.toLowerCase()) {
            case "pounds":
                if (toUnit.equalsIgnoreCase("kilograms")) {
                    result = value * 0.45359237;
                } else {
                    throw new IllegalArgumentException("Invalid toUnit: " + toUnit);
                }
                break;
            case "kilograms":
                if (toUnit.equalsIgnoreCase("pounds")) {
                    result = value * 2.20462262;
                } else {
                    throw new IllegalArgumentException("Invalid toUnit: " + toUnit);
                }
                break;
            default:
                throw new IllegalArgumentException("Invalid fromUnit: " + fromUnit);
        }
        
        double formattedResult = Double.parseDouble(String.format("%." + DECIMAL_PLACES + "f", result));
        return ResponseEntity.ok(formattedResult);
    }
    
    @GetMapping("/volume")
    public ResponseEntity<Double> convertVolume(
            @RequestParam("value") double value,
            @RequestParam("fromUnit") String fromUnit,
            @RequestParam("toUnit") String toUnit) {
        
        double result;
        
        switch (fromUnit.toLowerCase()) {
            case "gallons":
                if (toUnit.equalsIgnoreCase("liters")) {
                    result = value * 3.78541178;
                } else {
                    throw new IllegalArgumentException("Invalid toUnit: " + toUnit);
                }
                break;
            case "liters":
                if (toUnit.equalsIgnoreCase("gallons")) {
                    result = value * 0.26417205;
                } else {
                    throw new IllegalArgumentException("Invalid toUnit: " + toUnit);
                }
                break;
            default:
                throw new IllegalArgumentException("Invalid fromUnit: " + fromUnit);
        }
        
        double formattedResult = Double.parseDouble(String.format("%." + DECIMAL_PLACES + "f", result));
        return ResponseEntity.ok(formattedResult);
    }
}