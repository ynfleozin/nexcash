package com.leonardoalvarenga.nexcash.service;

import com.leonardoalvarenga.nexcash.domain.Expense;
import com.leonardoalvarenga.nexcash.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository repository;

    public Expense createExpense(Expense expense){
        return repository.save(expense);
    }
}
