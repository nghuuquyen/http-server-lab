# Node.js Web Application Examples

This repository contains educational examples demonstrating basic web application development using Node.js. The examples are designed to help students understand fundamental concepts of web servers and dynamic content generation.

## Project Overview

This repository includes two example projects:
1. **Simple Web Server**: A basic HTTP server that demonstrates the fundamentals of handling web requests
2. **Dynamic Blog Application**: A more complex example showing dynamic content generation with database integration

## Prerequisites

- Node.js installed on your system
- XAMPP or similar for MariaDB/MySQL database
- Text editor of your choice

## Setup Instructions

### 1. Configure Local Hosts

The hosts file location and editing process differs by operating system:

#### Windows
1. Open Notepad as Administrator
   - Right-click on Notepad
   - Select "Run as administrator"
2. Open the hosts file:
   - Navigate to: `C:\Windows\System32\drivers\etc\hosts`
3. Add the following lines:
```
127.0.0.1 site-a.local
127.0.0.1 site-b.local
127.0.0.1 dynamic-web.local
```
4. Save the file (You might need to save it to desktop first, then copy it back if having permission issues)

#### macOS
1. Open Terminal
2. Edit the hosts file using:
```bash
sudo nano /etc/hosts
```
3. Add the following lines:
```
127.0.0.1 site-a.local
127.0.0.1 site-b.local
127.0.0.1 dynamic-web.local
```
4. Save: Press `Ctrl + O`, then `Enter`
5. Exit: Press `Ctrl + X`

#### Ubuntu/Linux
1. Open Terminal
2. Edit the hosts file using:
```bash
sudo nano /etc/hosts
```
3. Add the following lines:
```
127.0.0.1 site-a.local
127.0.0.1 site-b.local
127.0.0.1 dynamic-web.local
```
4. Save: Press `Ctrl + O`, then `Enter`
5. Exit: Press `Ctrl + X`

### 2. Install Dependencies

First, make sure Node.js is installed on your system:

#### Windows
1. Download Node.js installer from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the installation wizard
3. Verify installation:
```bash
node --version
npm --version
```

#### macOS
1. Using Homebrew:
```bash
brew install node
```
Or download the installer from [nodejs.org](https://nodejs.org/)

2. Verify installation:
```bash
node --version
npm --version
```

#### Ubuntu/Linux
1. Install using apt:
```bash
sudo apt update
sudo apt install nodejs npm
```
2. Verify installation:
```bash
node --version
npm --version
```

Then, install project dependencies:
```bash
cd nodejs
npm install
```

### 3. Database Setup (for Blog Application)

#### Windows (XAMPP)
1. Install XAMPP from [apachefriends.org](https://www.apachefriends.org/)
2. Start XAMPP Control Panel and start MySQL service
3. Update database credentials in `nodejs/sample-blogs-server.js`:
```javascript
const db = mysql.createConnection({
    host: 'localhost',    // Use 'localhost' for Windows
    user: 'root',        // Default XAMPP username
    password: '',        // Default XAMPP password is empty
    database: 'blog_app'
});
```

#### macOS (XAMPP)
1. Install XAMPP from [apachefriends.org](https://www.apachefriends.org/)
2. Start XAMPP and MySQL service from XAMPP manager
3. Update database credentials in `nodejs/sample-blogs-server.js`:
```javascript
const db = mysql.createConnection({
    host: 'localhost',    // Use 'localhost' for local setup
    user: 'root',        // Default XAMPP username
    password: 'root',    // Default XAMPP password on macOS
    database: 'blog_app'
});
```

#### Ubuntu/Linux
1. Install MariaDB:
```bash
sudo apt update
sudo apt install mariadb-server
sudo mysql_secure_installation
```
2. Update database credentials in `nodejs/sample-blogs-server.js`:
```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',  // Password set during installation
    database: 'blog_app'
});
```

## Running the Applications

### 1. Simple Web Server
This is a basic HTTP server that responds with a "Hello" message:

```bash
node nodejs/sample-app-server.js
```
The server will start on port 3000. Visit http://site-b.local to see the response.

### 2. Blog Application
This is a more complex example that demonstrates:
- Dynamic content generation
- Database integration
- Basic routing
- HTML template rendering

To run:
```bash
node nodejs/sample-blogs-server.js
```

## Testing the Applications

1. Make sure your hosts file is properly configured
2. Ensure no other services are using ports 80 or 3000
3. Visit these URLs in your browser:
```
http://site-a.local
http://site-b.local
http://dynamic-web.local
```

### Troubleshooting

#### Windows
- If URLs don't work, try flushing DNS: `ipconfig /flushdns` in Command Prompt (Admin)
- Check if ports are in use: `netstat -ano | findstr :3000`

#### macOS
- Flush DNS cache: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
- Check ports in use: `lsof -i :3000`

#### Ubuntu/Linux
- Flush DNS cache: `sudo systemd-resolve --flush-caches`
- Check ports in use: `sudo lsof -i :3000`

## ⚠️ Educational Purpose

These examples are for learning purposes only and demonstrate basic concepts. They are not production-ready and do not implement security best practices.

## Learning Objectives

- Understanding basic HTTP server creation
- Working with database connections
- Handling different URL routes
- Generating dynamic HTML content
- Basic web application architecture