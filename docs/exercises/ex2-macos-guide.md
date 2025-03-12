# Exercise 2: Dynamic Website with Node.js (macOS)

This guide walks you through setting up a dynamic blog website using Node.js and MariaDB on macOS.

## Prerequisites
- macOS 10.15 or later
- Homebrew installed
- Node.js installed
- MariaDB installed via Homebrew

## Installation Steps

### 1. Database Setup

1. Start MariaDB service:
   ```bash
   brew services start mariadb
   ```

2. Create database and user:
   ```bash
   # Connect to MariaDB
   mysql -u root

   # Create database and table
   CREATE DATABASE blog_app;
   USE blog_app;

   CREATE TABLE blogs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT,
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
   ```

### 2. Node.js Application Setup

1. Create project structure:
   ```bash
   mkdir -p ~/projects/blog-app
   cd ~/projects/blog-app
   npm init -y
   ```

2. Install dependencies:
   ```bash
   npm install mysql2
   ```

3. Create server file (server.js):
   ```javascript
   /**
    * ⚠️ WARNING: This code is for educational purposes only! ⚠️
    * 
    * The following code is a simplified example to illustrate the core concept 
    * of how a web application receives and processes requests to generate dynamic content. 
    * 
    * ❌ Do NOT use this in a production environment.
    * ✅ This is solely for learning and understanding how basic web applications work.
    * 
    * Security, scalability, and best practices are NOT considered in this implementation.
    */
   const http = require('http');
   const url = require('url');
   const mysql = require('mysql2');

   const db = mysql.createConnection({
       host: 'localhost',
       user: 'blog_user',         // Replace with your username
       password: 'your_password', // Replace with your password
       database: 'blog_app'
   });

   db.connect(err => {
       if (err) {
           console.error('Database connection failed:', err);
           return;
       }
       console.log('Connected to MariaDB');
   });

   // Function to query the database
   function queryDatabase(sql, params = []) {
       return new Promise((resolve, reject) => {
           db.query(sql, params, (err, results) => {
               if (err) {
                   reject(err);
               } else {
                   resolve(results);
               }
           });
       });
   }

   // Generate homepage HTML with a list of blogs
   async function generateHomepageHtml() {
       const blogs = await queryDatabase('SELECT id, title FROM blogs');
       const blogLinks = blogs.map(blog => 
           `<li><a href='/blog?id=${blog.id}'>${blog.title}</a></li>`
       ).join('');
       
       return `
           <html>
           <head><title>Blog List</title></head>
           <body>
               <h1>Blogs</h1>
               <ul>${blogLinks}</ul>
           </body>
           </html>
       `;
   }

   // Generate blog detail HTML for a specific blog post
   async function generateBlogDetailHtml(blogId) {
       const results = await queryDatabase('SELECT title, content FROM blogs WHERE id = ?', [blogId]);

       if (results.length === 0) {
           return `
               <html>
               <head><title>Not Found</title></head>
               <body>
                   <h1>Blog not found</h1>
                   <a href='/'>Back to home</a>
               </body>
               </html>
           `;
       }

       const blog = results[0];
       return `
           <html>
           <head><title>${blog.title}</title></head>
           <body>
               <h1>${blog.title}</h1>
               <p>${blog.content}</p>
               <a href='/'>Back to home</a>
           </body>
           </html>
       `;
   }

   // Define route handlers
   const routeHandlers = {
       '/': generateHomepageHtml,
       '/blog': async (query) => generateBlogDetailHtml(query.id),
   };

   const pageNotFoundHandler = async () => `
       <html>
           <head>
               <title>404</title>
           </head>
           <body>
               <h1>Page not found</h1>
           </body>
       </html>
   `;

   // Create an HTTP server
   const server = http.createServer(async (req, res) => {
       const parsedUrl = url.parse(req.url, true);
       const handler = routeHandlers[parsedUrl.pathname];

       // If the route is not found, return a 404 page
       if (handler === undefined) {
           res.writeHead(404, { 'Content-Type': 'text/html' });
           res.end(await pageNotFoundHandler());
           return;
       }

       try {
           const htmlContent = await handler(parsedUrl.query);
           res.writeHead(200, { 'Content-Type': 'text/html' });
           res.end(htmlContent);
       } catch (error) {
           res.writeHead(500, { 'Content-Type': 'text/html' });
           res.end('<h1>Server Error</h1><p>Something went wrong.</p>');
           console.error('Error:', error);
       }
   });

   // Start the server
   const PORT = 3000;
   server.listen(PORT, () => {
       console.log(`Server is running at http://localhost:${PORT}`);
   });
   ```

### 3. Apache Virtual Host Configuration

1. Create virtual host configuration:
   ```apache
   # Create vhosts directory if it doesn't exist
   sudo mkdir -p /usr/local/etc/httpd/vhosts

   # Create configuration file
   sudo nano /usr/local/etc/httpd/vhosts/blog-app.local.conf

   <VirtualHost *:80>
       ServerName blog-app.local
       ProxyPreserveHost On
       ProxyPass / http://localhost:3000/
       ProxyPassReverse / http://localhost:3000/
       ErrorLog "/usr/local/var/log/httpd/blog-app-error.log"
       CustomLog "/usr/local/var/log/httpd/blog-app-access.log" combined
   </VirtualHost>
   ```

2. Update Apache configuration:
   ```bash
   # Enable required modules
   sudo nano /usr/local/etc/httpd/httpd.conf

   # Uncomment or add these lines:
   LoadModule proxy_module lib/httpd/modules/mod_proxy.so
   LoadModule proxy_http_module lib/httpd/modules/mod_proxy_http.so

   # Add this line at the bottom:
   Include /usr/local/etc/httpd/vhosts/*.conf
   ```

3. Update hosts file:
   ```bash
   sudo nano /etc/hosts

   # Add this line:
   127.0.0.1 blog-app.local
   ```

### 4. Start Services

1. Start/restart Apache:
   ```bash
   brew services restart httpd
   ```

2. Start Node.js application:
   ```bash
   cd ~/projects/blog-app
   node server.js
   ```

## Testing

1. Test the application:
   - Open your browser and visit http://blog-app.local
   - Click on blog titles to view individual posts
   - Check server logs for any errors

## Understanding the Code

### Core Components

1. **HTTP Server**
   - Uses Node.js built-in `http` module
   - Creates a server that listens for incoming requests
   - Parses URLs to determine which content to serve

2. **Database Connection**
   - Uses `mysql2` for database operations
   - Implements a Promise-based query function
   - Handles connection errors gracefully

3. **Route Handlers**
   - Simple routing system using object literals
   - Separate handlers for homepage and blog details
   - Async functions for database operations

4. **HTML Generation**
   - Dynamic HTML generation based on data
   - Template literals for easy HTML formatting
   - Error handling for missing content

## Troubleshooting

### Database Connection Issues
```bash
# Check MariaDB status
brew services list | grep mariadb

# Restart MariaDB
brew services restart mariadb

# Check logs
tail -f /usr/local/var/mysql/*.err
```

### Node.js Application Issues
```bash
# Check if port 3000 is available
lsof -i :3000

# Kill process if needed
kill $(lsof -t -i:3000)
```

### Apache Issues
```bash
# Check Apache configuration
httpd -t

# Check Apache logs
tail -f /usr/local/var/log/httpd/error_log

# Restart Apache
brew services restart httpd
``` 