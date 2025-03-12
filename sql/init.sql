CREATE DATABASE blog_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE blog_app;

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add sample data
INSERT INTO blogs (title, content) VALUES
('First Blog', 'This is our first blog post content'),
('Second Blog', 'Another interesting post about web development'),
('Third Blog', 'The latest news in technology and web development');

-- Create user with privileges
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON blog_app.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;