package com.umc.study.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class BookJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> findAll() {
        String sql = "SELECT * FROM book";
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> findBooksByCategory(Integer categoryId) {
        String sql = "SELECT * FROM book WHERE category_id = ?";
        return jdbcTemplate.queryForList(sql, categoryId);
    }

    public void save(Map<String, Object> body){
        String sql = "INSERT INTO book (category_id, title, description, is_available) VALUES (?, ?, ?, true)";

        jdbcTemplate.update(
                sql,
                body.get("categoryId"),
                body.get("title"),
                body.get("description")
        );
    }

    public Boolean isAvailable(Integer bookId) {
        String sql = "SELECT is_available FROM book WHERE book_id = ?";
        return jdbcTemplate.queryForObject(sql, Boolean.class, bookId);
    }

    public void rentalBook(Integer userId, Integer bookId) {
        String sql = "INSERT INTO rental (user_id, book_id, rented_at, due_at) " +
                "VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))";
        jdbcTemplate.update(sql, userId, bookId);
    }

    public void updateAvailability(Integer bookId, boolean available) {
        String sql = "UPDATE book SET is_available = ? WHERE book_id = ?";
        jdbcTemplate.update(sql, available, bookId);
    }
}
