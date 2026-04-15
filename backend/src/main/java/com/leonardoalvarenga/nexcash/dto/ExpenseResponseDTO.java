package com.leonardoalvarenga.nexcash.dto;

import com.leonardoalvarenga.nexcash.domain.enums.ExpenseStatus;

import java.math.BigDecimal;
import java.util.UUID;

public record ExpenseResponseDTO(
        UUID id,
        String description,
        BigDecimal price,
        ExpenseStatus status
) {
}
