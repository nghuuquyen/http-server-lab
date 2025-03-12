# Exercise 1: Static Website Deployment (Ubuntu)

This guide walks you through deploying two static websites using Apache on Ubuntu Linux.

## Prerequisites
- Ubuntu 20.04 or later
- Sudo privileges
- Terminal access

## Installation Steps

### 1. Install Apache
```bash
# Update package list
sudo apt update

# Install Apache
sudo apt install apache2

# Enable required modules
sudo a2enmod rewrite
sudo a2enmod vhost_alias
```

### 2. Configure Apache

#### Virtual Hosts Configuration
1. Create virtual host files:
```bash
# Create configuration files
sudo nano /etc/apache2/sites-available/site-a.conf
```

2. Add configuration for site-a:
```apache
<VirtualHost *:80>
    ServerName site-a.local
    DocumentRoot /var/www/site-a
    <Directory /var/www/site-a>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

3. Create and configure site-b:
```bash
sudo nano /etc/apache2/sites-available/site-b.conf
```

4. Add configuration for site-b:
```apache
<VirtualHost *:80>
    ServerName site-b.local
    DocumentRoot /var/www/site-b
    <Directory /var/www/site-b>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### 3. Configure Hosts File
1. Edit hosts file:
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
# Create directories
sudo mkdir -p /var/www/site-a
sudo mkdir -p /var/www/site-b

# Create test pages
echo "<h1>Welcome to Site A</h1>" | sudo tee /var/www/site-a/index.html
echo "<h1>Welcome to Site B</h1>" | sudo tee /var/www/site-b/index.html

# Set permissions
sudo chown -R www-data:www-data /var/www/site-a
sudo chown -R www-data:www-data /var/www/site-b
sudo chmod -R 755 /var/www/site-a
sudo chmod -R 755 /var/www/site-b
```

### 5. Enable Sites and Restart Apache
```bash
# Enable sites
sudo a2ensite site-a.conf
sudo a2ensite site-b.conf

# Disable default site (optional)
sudo a2dissite 000-default.conf

# Test configuration
sudo apache2ctl configtest

# Restart Apache
sudo systemctl restart apache2

# Enable Apache on boot
sudo systemctl enable apache2
```

## Verification
1. Check Apache status:
```bash
sudo systemctl status apache2
```

2. Test websites in browser:
   - http://site-a.local
   - http://site-b.local

## Troubleshooting

### Port 80 Already in Use
```bash
# Check what's using port 80
sudo lsof -i :80

# Kill the process
sudo kill <PID>

# Alternative: Change Apache port
sudo nano /etc/apache2/ports.conf
# Change "Listen 80" to another port
```

### Permission Issues
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www
sudo chmod -R 755 /var/www

# Add your user to www-data group
sudo usermod -a -G www-data $USER
```

### Apache Errors
```bash
# Check Apache error log
sudo tail -f /var/log/apache2/error.log

# Check Apache access log
sudo tail -f /var/log/apache2/access.log

# Test Apache configuration
sudo apache2ctl -t
```

### DNS Cache
```bash
# Flush DNS cache
sudo systemd-resolve --flush-caches
``` 