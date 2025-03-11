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
    host: 'mariadb',
    user: 'root',         // Replace with your username
    password: 'root',     // Replace with your password
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