# Setup local Hosts file

```bash
sudo nano /etc/hosts
```

```
127.0.0.1 landing-page.local
127.0.0.1 webapp.local
127.0.0.1 dynamic-web.local
```

# Start Sample Wep Application Server by Node.js

```bash
node nodejs/sample-app-server.js
```


# Test

Please visit following URLs:

```
http://landing-page.local
http://webapp.local
http://dynamic-web.local
```