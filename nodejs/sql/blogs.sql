CREATE DATABASE blog_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE blog_app;

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO blogs (title, content) VALUES
    ('First Blog', 'This is the first blog content.'),
    ('Second Blog', 'This is the second blog content.'),
    ('Third Blog', 'This is the third blog content.');