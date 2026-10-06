package com.umc.study.controller;

import com.umc.study.dto.request.CreateBookReqDto;
import com.umc.study.dto.response.BookResDto;
import com.umc.study.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/books")
    public List<BookResDto> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/books/category/{categoryId}")
    public List<Map<String, Object>> getBooksByCategory(
            @PathVariable Integer categoryId
    ) {
        return bookService.getBooksByCategory(categoryId);
    }

    @PostMapping("/books")
    @ResponseStatus(HttpStatus.CREATED)
    public BookResDto createBook(
            @Valid @RequestBody CreateBookReqDto request
            ){
        return bookService.createBook(request);
    }

    @PostMapping("/rentals")
    public String rentalBook(
            @RequestBody Map<String, Object> body
    ){
        Integer bookId = (Integer)body.get("bookId");
        Integer userId = (Integer)body.get("userId");
        bookService.rentalBook(userId, bookId);
        return "도서 대여가 완료되었습니다!";
    }


}