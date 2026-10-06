package com.umc.study.service;

import com.umc.study.dto.request.CreateBookReqDto;
import com.umc.study.dto.response.BookResDto;
import com.umc.study.entity.Book;
import com.umc.study.entity.Category;
import com.umc.study.repository.BookJdbcRepository;
import com.umc.study.repository.BookRepository;
import com.umc.study.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookJdbcRepository bookJdbcRepository;
    private final CategoryRepository categoryRepository;

    public List<Map<String, Object>> getAllBooks() {
        return bookJdbcRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<BookResDto> getBooks() {
        return bookRepository.findAllByOrderByBookIdDesc().stream()
                .map(BookResDto::from)
                .toList();
    }

    public List<Map<String, Object>> getBooksByCategory(Integer categoryId) {
        return bookJdbcRepository.findBooksByCategory(categoryId);
    }

    @Transactional
    public BookResDto createBook(CreateBookReqDto request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));

        Book book = new Book(category, request.title(), request.description());
        return BookResDto.from(bookRepository.save(book));
    }

    @Transactional
    public void rentalBook(Integer userId, Integer bookId){
        Boolean available = bookJdbcRepository.isAvailable(bookId);
        if (available == null) {
            throw new IllegalArgumentException("존재하지 않는 도서입니다.");
        }
        if (!available) {
            throw new IllegalStateException("이미 대여중인 도서입니다.");
        }

        bookJdbcRepository.rentalBook(userId, bookId);
        bookJdbcRepository.updateAvailability(bookId, false);
    }
}
