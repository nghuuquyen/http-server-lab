# Exercise 1: Static Website Deployment (macOS)

This guide walks you through deploying two static websites using Apache on macOS.

## Prerequisites
- macOS 10.15 or later
- [Homebrew](https://brew.sh/) package manager
- Terminal access

## Installation Steps

### 1. Install Apache
```bash
# Install Apache via Homebrew
brew install httpd

# Start Apache service
brew services start httpd

# Enable Apache to start on boot
brew services restart httpd
```

### 2. Configure Apache

#### Main Configuration
1. Open Apache configuration:
```bash
sudo nano /usr/local/etc/httpd/httpd.conf
```

2. Ensure these modules are enabled (uncommented):
```apache
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
LoadModule vhost_alias_module lib/httpd/modules/mod_vhost_alias.so
```

#### Virtual Hosts Configuration
1. Create and edit the virtual hosts file:
```bash
sudo nano /usr/local/etc/httpd/extra/httpd-vhosts.conf
```

2. Add your virtual host configurations:
```apache
<VirtualHost *:80>
    ServerName site-a.local
    DocumentRoot "/usr/local/var/www/site-a"
    <Directory "/usr/local/var/www/site-a">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:80>
    ServerName site-b.local
    DocumentRoot "/usr/local/var/www/site-b"
    <Directory "/usr/local/var/www/site-b">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### 3. Configure Hosts File
1. Open Terminal and edit hosts file:
```bash
sudo nano /etc/hosts
```

2. Add these lines:
```
127.0.0.1 site-a.local
127.0.0.1 site-b.local
```

### 4. Create Website Content
```bash
# Create web directories
sudo mkdir -p /usr/local/var/www/site-a
sudo mkdir -p /usr/local/var/www/site-b

# Create test pages
echo "<h1>Welcome to Site A</h1>" | sudo tee /usr/local/var/www/site-a/index.html
echo "<h1>Welcome to Site B</h1>" | sudo tee /usr/local/var/www/site-b/index.html

# Set permissions
sudo chown -R $(whoami):staff /usr/local/var/www/site-a
sudo chown -R $(whoami):staff /usr/local/var/www/site-b
chmod -R 755 /usr/local/var/www/site-a
chmod -R 755 /usr/local/var/www/site-b
```

### 5. Start/Restart Apache
```bash
# Restart Apache to apply changes
brew services restart httpd

# Verify Apache is running
brew services list | grep httpd
```

## Verification
1. Open browser and visit:
   - http://site-a.local
   - http://site-b.local
2. You should see the respective website content

## Troubleshooting

### Port 80 Already in Use
```bash
# Check what's using port 80
sudo lsof -i :80

# Kill the process
sudo kill <PID>
```

### Permission Issues
```bash
# Fix permissions on web directories
sudo chmod -R 755 /usr/local/var/www
sudo chown -R $(whoami):staff /usr/local/var/www
```

### Apache Errors
```bash
# Check Apache error log
tail -f /usr/local/var/log/httpd/error_log

# Test Apache configuration
httpd -t
```

### DNS Cache
```bash
# Flush DNS cache
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
``` 