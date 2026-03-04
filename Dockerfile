FROM php:8.2-apache

# Enable Apache modules required by .htaccess (rewrite, headers)
RUN a2enmod rewrite headers

# Set the working directory
WORKDIR /var/www/html

# Copy source code to the container
COPY . /var/www/html/

# Expose port 80
EXPOSE 80
