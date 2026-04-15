package com.leonardoalvarenga.nexcash.controller;

import com.leonardoalvarenga.nexcash.domain.Expense;
import com.leonardoalvarenga.nexcash.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService service;

    @PostMapping
    public ResponseEntity<Expense> create(@Valid @RequestBody  Expense expense){
        Expense savedExpense = service.createExpense(expense);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
    }
}
