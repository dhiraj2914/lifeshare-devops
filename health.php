<?php
/**
 * health.php – Health check endpoint.
 *
 * GET /health.php
 *
 * Returns HTTP 200 + JSON body when both PHP and MySQL are reachable.
 * Returns HTTP 503 + JSON body with error detail if DB is unreachable.
 *
 * Example success response:
 *   {"status":"healthy","php":"8.2.x","db":"connected","tables":4,"ts":"..."}
 *
 * Example failure response:
 *   {"status":"unhealthy","php":"8.2.x","db":"unreachable","error":"...","ts":"..."}
 */

header('Content-Type: application/json; charset=utf-8');
// Restrict to GET only
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

require_once __DIR__ . '/api/db.php';

$phpVersion = PHP_VERSION;
$ts         = date('c');

try {
    $pdo = getDB();

    // Verify the four expected tables exist
    $stmt   = $pdo->query("SELECT COUNT(*) AS cnt FROM information_schema.tables
                            WHERE table_schema = DATABASE()
                              AND table_name IN ('hospitals','blood_inventory','donors','blood_requests')");
    $row    = $stmt->fetch();
    $tables = (int) $row['cnt'];

    http_response_code(200);
    echo json_encode([
        'status'  => 'healthy',
        'php'     => $phpVersion,
        'db'      => 'connected',
        'tables'  => $tables,
        'ts'      => $ts,
    ]);
} catch (Throwable $e) {
    http_response_code(503);
    echo json_encode([
        'status'  => 'unhealthy',
        'php'     => $phpVersion,
        'db'      => 'unreachable',
        'error'   => $e->getMessage(),
        'ts'      => $ts,
    ]);
}
