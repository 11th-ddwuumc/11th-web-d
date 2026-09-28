package com.umc.study.controller;

import com.umc.study.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/books")
    public List<Map<String, Object>> getBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/books/category/{categoryId}")
    public List<Map<String, Object>> getBooksByCategory(
            @PathVariable Integer categoryId
    ) {
        return bookService.getBooksByCategory(categoryId);
    }

    @PostMapping("/books")
    public String createBook(
            @RequestBody Map<String, Object> body
    ){
        bookService.createBook(body);
        return "도서 등록이 완료되었습니다!";
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