<?php
/**
 * db.php – Shared PDO connection helper.
 *
 * Reads DB credentials exclusively from environment variables.
 * Fallback values are safe local-only placeholders; they contain no real secret.
 *
 * Environment variables consumed:
 *   DB_HOST     – MySQL hostname     (fallback: "db")
 *   DB_NAME     – Database name      (fallback: "blood_bank_db")
 *   DB_USER     – MySQL user         (fallback: "lifeshare")
 *   DB_PASSWORD – MySQL password     (fallback: "changeme_app")
 */
function getDB(): PDO
{
    $host = getenv('DB_HOST')     ?: 'db';
    $name = getenv('DB_NAME')     ?: 'blood_bank_db';
    $user = getenv('DB_USER')     ?: 'lifeshare';
    $pass = getenv('DB_PASSWORD') ?: 'changeme_app';

    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    return new PDO($dsn, $user, $pass, $options);
}
