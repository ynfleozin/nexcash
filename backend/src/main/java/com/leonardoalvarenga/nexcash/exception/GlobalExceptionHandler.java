package com.leonardoalvarenga.nexcash.exception;

import com.leonardoalvarenga.nexcash.dto.FieldErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<FieldErrorDTO>> handleValidationErrors(MethodArgumentNotValidException ex){
        List<FieldError> errorsList = ex.getBindingResult().getFieldErrors();

        List<FieldErrorDTO> errorsListDTO = errorsList
                .stream()
                .map(error -> new FieldErrorDTO(
                        error.getField(),
                        error.getDefaultMessage()
                ))
                .toList();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorsListDTO);
    }
}
