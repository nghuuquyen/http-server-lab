# Exercise 1: Static Website Deployment (Windows)

This guide walks you through deploying two static websites using Apache on Windows.

## Prerequisites
- Windows 10 or later
- Administrative privileges
- XAMPP installer from [apachefriends.org](https://www.apachefriends.org/)

## Installation Steps

### 1. Install XAMPP
1. Download XAMPP installer
2. Run the installer as Administrator
3. Select components (minimum required):
   - Apache
   - MySQL
   - PHP
4. Choose installation directory (default: `C:\xampp`)
5. Complete the installation

### 2. Configure Apache

#### Enable Required Modules
1. Open `C:\xampp\apache\conf\httpd.conf`
2. Ensure these lines are uncommented:
   ```apache
   LoadModule rewrite_module modules/mod_rewrite.so
   LoadModule vhost_alias_module modules/mod_vhost_alias.so
   ```

#### Configure Virtual Hosts
1. Open `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
2. Add your virtual host configurations:
   ```apache
   <VirtualHost *:80>
       ServerName site-a.local
       DocumentRoot "C:/xampp/htdocs/site-a"
       <Directory "C:/xampp/htdocs/site-a">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>

   <VirtualHost *:80>
       ServerName site-b.local
       DocumentRoot "C:/xampp/htdocs/site-b"
       <Directory "C:/xampp/htdocs/site-b">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

### 3. Configure Hosts File
1. Open Notepad as Administrator
2. Open `C:\Windows\System32\drivers\etc\hosts`
3. Add these lines:
   ```
   127.0.0.1 site-a.local
   127.0.0.1 site-b.local
   ```

### 4. Create Website Content
```powershell
# Create directories
mkdir C:\xampp\htdocs\site-a
mkdir C:\xampp\htdocs\site-b

# Create index files
echo "<h1>Welcome to Site A</h1>" > C:\xampp\htdocs\site-a\index.html
echo "<h1>Welcome to Site B</h1>" > C:\xampp\htdocs\site-b\index.html
```

### 5. Start Apache
1. Open XAMPP Control Panel
2. Click "Start" next to Apache
3. Verify service shows green status

## Verification
1. Open browser and visit:
   - http://site-a.local
   - http://site-b.local
2. You should see the respective website content

## Troubleshooting

### Port 80 Already in Use
1. Open Command Prompt as Administrator
2. Run: `netstat -ano | findstr :80`
3. Note the PID using port 80
4. Run: `taskkill /PID <PID> /F`

### Permission Errors
1. Right-click on htdocs folder
2. Properties → Security → Edit
3. Add your user with Full control
4. Apply changes

### Apache Won't Start
1. Check XAMPP error logs: `C:\xampp\apache\logs\error.log`
2. Verify no other web servers are running
3. Try changing Apache port in `httpd.conf` 