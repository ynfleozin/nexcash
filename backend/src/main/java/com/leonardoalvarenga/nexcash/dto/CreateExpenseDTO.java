package com.leonardoalvarenga.nexcash.dto;

import java.math.BigDecimal;

public record CreateExpenseDTO(
        String description,
        BigDecimal price
) {
}
