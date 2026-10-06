package com.umc.study.dto.response;

import com.umc.study.entity.Book;

public record BookResDto (
        Long bookId,
        String title,
        String description,
        String categoryName,
        Boolean isAvailable
){
    public static BookResDto from (Book book) {
        return new BookResDto (
                book.getBookId(),
                book.getTitle(),
                book.getDescription(),
                book.getCategory().getName(),
                book.getIsAvailable()
        );
    }
}
