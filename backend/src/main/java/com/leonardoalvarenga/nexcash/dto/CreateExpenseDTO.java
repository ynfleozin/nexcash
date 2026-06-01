package com.leonardoalvarenga.nexcash.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreateExpenseDTO(
        String description,
        BigDecimal price,
        LocalDateTime date
) {
}
