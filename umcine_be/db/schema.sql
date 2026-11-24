CREATE DATABASE IF NOT EXISTS umcine CHARACTER SET utf8mb4;
USE umcine;

CREATE TABLE IF NOT EXISTS member (
  member_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(254) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  nickname VARCHAR(50) NOT NULL UNIQUE,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS rating (
  rating_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  movie_id BIGINT NOT NULL,
  score TINYINT NOT NULL,
  comment TEXT,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL,
  UNIQUE KEY uk_rating_member_movie (member_id, movie_id),
  FOREIGN KEY (member_id) REFERENCES member(member_id)
);
