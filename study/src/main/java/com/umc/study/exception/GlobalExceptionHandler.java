package com.umc.study.exception;

import com.umc.study.dto.response.ErrorResDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 요청 DTO 검증 실패 (빈 제목, categoryId 누락 등)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResDto> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return error(HttpStatus.BAD_REQUEST, message);
    }

    // 존재하지 않는 카테고리 / 도서
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResDto> handleNotFound(IllegalArgumentException e) {
        return error(HttpStatus.NOT_FOUND, e.getMessage());
    }

    // 이미 대여중인 도서
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResDto> handleConflict(IllegalStateException e) {
        return error(HttpStatus.CONFLICT, e.getMessage());
    }

    private ResponseEntity<ErrorResDto> error(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(new ErrorResDto(status.value(), message));
    }
}
