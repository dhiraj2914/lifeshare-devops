# ─────────────────────────────────────────────────────────────────────────────
# LifeShare – Web image  (Stage 1: php:8.2-apache)
#
# WHY php:8.2-apache instead of php-fpm + nginx?
#   • Single container = simpler Compose, fewer moving parts for a first stage.
#   • Apache mod_php has no socket / proxy hop between the web server and PHP.
#   • php:8.2-apache is the official, well-maintained image; security patches
#     are upstream.
#   • Switching to fpm+nginx is straightforward later and is prepared in k8s/.
# ─────────────────────────────────────────────────────────────────────────────
FROM php:8.2-apache

LABEL maintainer="Athreya, Dhiraj, Rithwik, Sagar"
LABEL description="LifeShare GPS Blood Bank Finder – php:8.2-apache"

# Update and upgrade base packages to resolve upstream CVEs (fixes Trivy HIGH/CRITICAL findings)
RUN apt-get update && apt-get upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install the PDO MySQL extension (needed by api/ and health.php).
# docker-php-ext-install is the recommended way inside official PHP images.
RUN docker-php-ext-install pdo pdo_mysql

# ── Apache configuration ─────────────────────────────────────────────────────
# Enable mod_rewrite so pretty URLs work if added later.
RUN a2enmod rewrite

# Override ServerName to suppress the FQDN warning.
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# ── App source ───────────────────────────────────────────────────────────────
WORKDIR /var/www/html

# Copy all static + PHP files.
# .dockerignore keeps node_modules, PDFs, and secrets out of the build context.
COPY index.html styles.css app.js logo.svg health.php ./
COPY api/ ./api/

# ── Permissions ──────────────────────────────────────────────────────────────
# www-data (uid 33) already exists in the base image.
# Make uploaded/runtime dirs writable if needed.
RUN chown -R www-data:www-data /var/www/html

# ── Environment variable defaults (safe local fallbacks, no real secrets) ────
# These are ONLY used when the container is run without a .env file.
# Real values must be supplied via environment variables or docker-compose .env.
ENV DB_HOST=db \
    DB_NAME=blood_bank_db \
    DB_USER=lifeshare \
    DB_PASSWORD=changeme_app

EXPOSE 80

# ── Health check ─────────────────────────────────────────────────────────────
# Apache + PHP must respond at /health.php AND DB must be reachable.
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -sf http://localhost/health.php | grep -q '"status":"healthy"' || exit 1
