package com.umc.study.service;

import com.umc.study.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Map<String, Object>> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Map<String, Object>> getBooksByCategory(Integer categoryId) {
        return bookRepository.findBooksByCategory(categoryId);
    }

    public void createBook(Map<String, Object> body){
        bookRepository.save(body);
    }

    @Transactional
    public void rentalBook(Integer userId, Integer bookId){
        Boolean available = bookRepository.isAvailable(bookId);
        if (available == null) {
            throw new IllegalArgumentException("존재하지 않는 도서입니다.");
        }
        if (!available) {
            throw new IllegalStateException("이미 대여중인 도서입니다.");
        }

        bookRepository.rentalBook(userId, bookId);
        bookRepository.updateAvailability(bookId, false);
    }
}