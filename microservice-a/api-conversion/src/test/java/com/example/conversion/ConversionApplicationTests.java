package com.example.conversion;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class ConversionApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testConvertWeight() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/convert/weight")
                .param("value", "10")
                .param("fromUnit", "pounds")
                .param("toUnit", "kilograms"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("4.53592"));
    }

    @Test
    public void testConvertVolume() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/convert/volume")
                .param("value", "5")
                .param("fromUnit", "gallons")
                .param("toUnit", "liters"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("18.92706"));
    }

    // More tests, tbd...
}
