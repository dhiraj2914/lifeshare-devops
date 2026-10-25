# ──────────────────────────────────────────────
# LifeShare – Frontend static-server image
# Base: official Node 20 LTS (Alpine for small size)
# ──────────────────────────────────────────────
FROM node:20-alpine

LABEL maintainer="Athreya, Dhiraj, Rithwik, Sagar"
LABEL description="LifeShare GPS Blood Bank Finder – static frontend"

WORKDIR /app

# Copy only the files needed to serve static content.
# node_modules, generate_pdf.js, and report files are excluded via .dockerignore
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application source
COPY index.html styles.css app.js logo.svg ./

EXPOSE 3000

# Run as non-root user for security
RUN addgroup -S lifeshare && adduser -S -G lifeshare lifeshare
USER lifeshare

CMD ["npx", "serve", "-l", "3000", "."]
