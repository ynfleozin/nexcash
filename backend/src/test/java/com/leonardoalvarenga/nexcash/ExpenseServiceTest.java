package com.leonardoalvarenga.nexcash;

import com.leonardoalvarenga.nexcash.domain.Expense;
import com.leonardoalvarenga.nexcash.domain.enums.ExpenseStatus;
import com.leonardoalvarenga.nexcash.dto.CreateExpenseDTO;
import com.leonardoalvarenga.nexcash.dto.ExpenseResponseDTO;
import com.leonardoalvarenga.nexcash.repository.ExpenseRepository;
import com.leonardoalvarenga.nexcash.service.ExpenseService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ExpenseServiceTest {

    @Mock
    private ExpenseRepository repository;

    @InjectMocks
    private ExpenseService service;

    @Test
    void shouldCreateExpense(){
        UUID id = UUID.randomUUID();

        CreateExpenseDTO dto = new CreateExpenseDTO(
                "Dinner",
                new BigDecimal("10.30"),
                LocalDateTime.now()
        );

        Expense savedExpense = new Expense();
        savedExpense.setId(id);
        savedExpense.setDescription("Dinner");
        savedExpense.setPrice(new BigDecimal("10.30"));
        savedExpense.setStatus(ExpenseStatus.PENDING);

        when(repository.save(any(Expense.class)))
                .thenReturn(savedExpense);

        ExpenseResponseDTO result = service.createExpense(dto);

        assertNotNull(result);
        assertEquals(id, result.id());
        assertEquals("Dinner", result.description());
        assertEquals(new BigDecimal("10.30"), result.price());
        assertEquals(ExpenseStatus.PENDING, result.status());

        verify(repository).save(any(Expense.class));
    }
}
