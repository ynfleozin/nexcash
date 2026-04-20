package com.leonardoalvarenga.nexcash.service;

import com.leonardoalvarenga.nexcash.domain.Expense;
import com.leonardoalvarenga.nexcash.dto.ExpenseResponseDTO;
import com.leonardoalvarenga.nexcash.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository repository;

    public Expense createExpense(Expense expense){
        return repository.save(expense);
    }

    public List<ExpenseResponseDTO> findAll(){
        return repository.findAll()
                .stream()
                .map(expense -> new ExpenseResponseDTO(
                        expense.getId(),
                        expense.getDescription(),
                        expense.getPrice(),
                        expense.getStatus()
                ))
                .toList();
    }

    public void deleteExpense(UUID id) {
        repository.deleteById(id);
    }
}
