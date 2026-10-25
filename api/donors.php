<?php
/**
 * donors.php – Return all available donors.
 *
 * GET /api/donors.php
 * GET /api/donors.php?blood_group=O%2B   (filter by blood group)
 * GET /api/donors.php?available=1        (only available donors, default behaviour)
 *
 * Response: JSON array matching the JS DEFAULT_DONORS shape:
 *   { id, name, bloodGroup, lat, lng, type:"donor", phone, email, available }
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

require_once __DIR__ . '/db.php';

try {
    $pdo = getDB();

    $where  = [];
    $params = [];

    // Filter: blood_group
    if (!empty($_GET['blood_group'])) {
        $where[]  = 'blood_group = :bg';
        $params[':bg'] = trim($_GET['blood_group']);
    }

    // Filter: available (default all)
    if (isset($_GET['available']) && $_GET['available'] === '1') {
        $where[] = 'available = 1';
    }

    $sql = "SELECT id, name, blood_group AS bloodGroup,
                   latitude AS lat, longitude AS lng,
                   phone, email, available
            FROM donors"
         . ($where ? ' WHERE ' . implode(' AND ', $where) : '')
         . " ORDER BY name";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $result = [];
    foreach ($rows as $r) {
        $result[] = [
            'id'         => $r['id'],
            'name'       => $r['name'],
            'bloodGroup' => $r['bloodGroup'],
            'lat'        => (float) $r['lat'],
            'lng'        => (float) $r['lng'],
            'type'       => 'donor',
            'phone'      => $r['phone'],
            'email'      => $r['email'],
            'available'  => (bool) $r['available'],
        ];
    }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error']);
}
