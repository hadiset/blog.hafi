---
title: "Hafi Notes | Deploy Wordpress with Docker Compose and NGINX Reverse Proxy"
author: "Hafi"
publish_date: 2025-11-11
category: "Wordpress"
tags: ["wordpress", "docker", "nginx"]
description: "Sharing my workflow and lessons learned from deploying WordPress with Docker Compose and NGINX reverse proxy."
image: "/images/wp-nginx-docker.webp"
imageAlt: "Wordpress with Nginx and Docker Compose"
draft: false
featured: false
---

This post is part of my personal learning notes about deploying WordPress using Docker Compose and NGINX reverse proxy. It’s based on what I’ve tested and implemented on my own VPS setup. While it might not be perfect, I hope it can be useful for others who are exploring a similar workflow. If you notice anything that could be improved, I’d really appreciate your feedback.

## Why I Use Docker for WordPress ?

I started using Docker mostly out of curiosity — it just felt like the modern way to run web projects. Over time, I realized it also helps me maintain a consistent environment across different servers, especially when matching PHP and database versions. Using Docker for WordPress has made deployments feel cleaner and more predictable, even for small projects.

## My Setup: WordPress, Docker, and NGINX Specs

For this setup, I’m using a VPS from **Alibaba Cloud**, which only costs **$9.9/year** — a great deal for anyone starting out with self-hosted WordPress. 

If you’d like to try the same server, you can check it out [here](https://www.alibabacloud.com/campaign/benefits?referral_code=A92NGT).

The VPS runs **Debian 12** as the base operating system, with **NGINX 1.22** installed directly on the host machine. NGINX works as a reverse proxy that routes traffic to my Docker containers.

Inside Docker, I’m using the following images:
- **MariaDB:LTS** for the database, providing a stable and reliable MySQL-compatible backend.  
- **WordPress:PHP8.4-fpm** as the main application container, using PHP-FPM for better performance.  
- **Adminer:latest** as a lightweight database management tool for quick database management.

This combination provides a clean, isolated environment that’s easy to rebuild, maintain, and scale when needed.

For better organization, I keep all related files under the `/var/www/` directory on my server.  
Here’s the basic structure I’m using:

```yaml
/var/www/
├── adminer/
│ └── adminer.css
├── php/
│ └── custom.ini
├── docker-compose.yml
└── .env
```

- The `adminer` folder contains a custom CSS file to slightly tweak the Adminer interface.  
- The `php` folder stores my custom PHP configuration (`custom.ini`) that will be mounted into the WordPress container.  
- The main `docker-compose.yml` file lives in the root of `/var/www/`, so it can access both directories easily when the containers are built.

This structure keeps things tidy and makes it easier to maintain or migrate the setup later.

## Prepare `.env` File for Docker Compose

Before running the containers, I prefer to store all environment variables in a separate `.env` file.  
This helps keep the `docker-compose.yml` file clean and makes it easier to change configurations later without touching the main file.

Here’s what my `.env` file looks like:

```bash
# .env file

# MariaDB Variables
MARIADB_ROOT_PASSWORD=your_root_password
MARIADB_DATABASE=your_wp_database_name
MARIADB_USER=your_wp_database_user
MARIADB_PASSWORD=your_wp_database_pass

# WordPress Variables
WORDPRESS_DB_HOST=db
WORDPRESS_TABLE_PREFIX=wp_

# Expose Port Variables
WP_PORT=9000
ADMINER_PORT=8080
```

Make sure to replace these placeholder values with your own secure credentials.
Also, **never commit your `.env` file to version control (like GitHub) — it should always stay private**.
You can add it to your `.gitignore` file to prevent accidental uploads.

## Setting Up Docker Compose

Now that the `.env` file is ready, we can move on to creating the `docker-compose.yml` file.  
This file defines all the services we’ll need — WordPress, MariaDB, and Adminer — and how they connect to each other through a shared network.

Here’s my full `docker-compose.yml` setup:

```yaml
services:
  db:   
    image: mariadb:lts
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always    
    environment:
      - MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD}
      - MARIADB_DATABASE=${MARIADB_DATABASE}
      - MARIADB_USER=${MARIADB_USER}
      - MARIADB_PASSWORD=${MARIADB_PASSWORD}
    networks:
      - wp-network
  
  wordpress:
    image: wordpress:php8.4-fpm      
    volumes:
      - /var/www/wordpress:/var/www/wordpress
      - /var/www/php/custom.ini:/usr/local/etc/php/conf.d/custom.ini:ro
    restart: always
    ports:
      - ${WP_PORT}:9000
    environment:
      - WORDPRESS_DB_HOST=${WORDPRESS_DB_HOST}
      - WORDPRESS_DB_USER=${MARIADB_USER}
      - WORDPRESS_DB_PASSWORD=${MARIADB_PASSWORD}
      - WORDPRESS_DB_NAME=${MARIADB_DATABASE}
      - WORDPRESS_DEBUG=0
    depends_on:
      - db
    networks:
      - wp-network

  adminer:
    image: adminer:latest
    volumes:
      - /var/www/adminer/adminer.css:/var/www/html/adminer.css:ro
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - ${ADMINER_PORT}:8080
    networks:
      - wp-network

volumes:
  db_data:

networks:
  wp-network:
    driver: bridge
```

## Configuring NGINX Reverse Proxy

Once the Docker containers are ready, we need to configure NGINX as a reverse proxy to handle incoming traffic and forward PHP requests to the WordPress container.

In my setup, NGINX runs directly on the host (outside of Docker) and forwards requests to WordPress FPM running inside the container on port **9000**.  

Here’s the configuration I’m using:

```nginx
#/etc/nginx/sites-available/wp.yourdomain.com

server {
	listen 80;
	server_name wp.yourdomain.com;
	return 301 https://$server_name$request_uri;	
}

server {
	listen 443 ssl http2;
	ssl_certificate /etc/ssl/cert.pem;
	ssl_certificate_key /etc/ssl/key.pem;
	ssl_client_certificate /etc/ssl/cloudflare.crt;
	ssl_verify_client on;

	server_name wp.yourdomain.com;
	root /var/www/wordpress;
	index index.php index.html;

	access_log /var/www/logs/access.log;
	error_log /var/www/logs/error.log;
	
	location / {
        try_files $uri $uri/ /index.php?$args;
    }

	location ~ \.php$ {
		try_files $uri =404;
		fastcgi_split_path_info ^(.+\.php)(/.+)$;
		fastcgi_pass 127.0.0.1:9000;
		fastcgi_index index.php;
		include fastcgi_params;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		fastcgi_param PATH_INFO $fastcgi_path_info;
	}
	
	location ~ /\.ht {
		deny all;
	}

	location = /favicon.ico {
		log_not_found off;
		access_log off;
	}

	location = /robots.txt {
		log_not_found off;
		access_log off;
		allow all;
	}

	location ~* \.(jpg|jpeg|png|gif|ico|svg|css|js|otf|ttf|woff|woff2)$ {
		expires 365d;
		log_not_found off;
		access_log off;
	}
}
```
**Notes**

- The first server block listens on **port 80** and automatically redirects all requests to **HTTPS** for better security.
- The second block handles **HTTPS traffic** on port 443 and proxies PHP files to WordPress running at `127.0.0.1:9000`.
- I’m using **Cloudflare SSL certificates** here (`cloudflare.crt`), but you can replace this with **Let’s Encrypt** or any other SSL provider.
- The static files (like `.css`, `.js`, `.jpg`) are cached for **365 days** to improve performance.
- Log files are stored in `/var/www/logs/`, if the folder doesn’t exist, just create it — otherwise NGINX won’t be able to write the logs.

This configuration ensures that requests are securely routed to WordPress and that static assets are served efficiently.

## Configuring Cloudflare

I’m using **Cloudflare** mainly for **DNS management** and **SSL**.  
In this setup, Cloudflare handles my domain’s DNS — I simply point an **A record** to my VPS public IP address where the NGINX reverse proxy is running.  
This allows me to manage multiple domains and servers easily from a single dashboard.

For SSL, I use **Cloudflare’s Universal SSL**, which automatically issues and renews free SSL certificates.  
On my VPS, I’ve configured NGINX to trust Cloudflare’s client certificate (`cloudflare.crt`) and enforce HTTPS connections.  
This way, even though SSL is managed by Cloudflare, the connection between Cloudflare and my VPS remains secure (Full SSL mode).

You can also use other SSL solutions like **Let’s Encrypt**, but for this setup, Cloudflare’s Universal SSL is simpler and works perfectly for my needs.

## Running the Setup

Now everything is ready — we have our `.env` file, `docker-compose.yml`, and NGINX configuration.  
Let’s run and test the entire setup step by step.

### 1. Start Docker Containers

First, navigate to the directory where your `docker-compose.yml` file is located and start all containers:

```bash
cd /var/www/
docker compose up -d
```

This command will pull the required images (if they’re not already available) and start the containers in the background.
Once it’s done, check that everything is running correctly:

```bash
docker compose ps -a
```

Make sure all containers show the status **“Up”** — if any container shows **“Exited”**, check the logs using:

```bash
docker compose logs <service_name>
```

For example:

```bash
docker compose logs db
```

### 2. Enable the NGINX Configuration

After confirming that Docker is running fine, test the NGINX configuration to make sure there are no syntax errors:

```bash
nginx -t

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Then, link your NGINX configuration file to the `/etc/nginx/sites-enabled` directory:

```bash
ln -s /etc/nginx/sites-available/wp.yourdomain.com /etc/nginx/sites-enabled/
```

If everything looks good, reload NGINX to apply the changes:

```bash
systemctl reload nginx
```

### 3. Test the Setup

Now, open your browser and visit your domain (e.g., https://wp.yourdomain.com). If everything is configured correctly, you should see the WordPress installation page.

At this point:

- Docker containers are running in the background.
- NGINX is routing traffic correctly.
- Cloudflare handles DNS and SSL.

Your self-hosted WordPress on Docker is now live and ready to use.

## Final Thoughts
This setup might not be the most advanced way to run WordPress, but it works reliably for my needs.  

Using Docker makes my environment consistent and easy to rebuild, while NGINX and Cloudflare handle performance and security.

It’s a simple yet solid foundation that I can keep improving over time as I learn more about server management and containerization.