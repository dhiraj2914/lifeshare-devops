<?php
/**
 * hospitals.php – Return all hospitals with their blood inventory.
 *
 * GET /api/hospitals.php
 * GET /api/hospitals.php?blood_group=O%2B   (filter by blood group)
 *
 * Response: JSON array of hospital objects matching the JS DEFAULT_HOSPITALS shape:
 *   { id, name, address, phone, lat, lng, type:"hospital", bloodStock:{...} }
 */

header('Content-Type: application/json; charset=utf-8');
// Narrow CORS: only same-origin requests (browser enforces this; no wildcard).
// If you later need a separate front-end origin, restrict to that exact origin here.

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

require_once __DIR__ . '/db.php';

try {
    $pdo = getDB();

    // Fetch all hospitals
    $hospitals = $pdo->query(
        "SELECT id, name, address, phone,
                latitude  AS lat,
                longitude AS lng
         FROM hospitals
         ORDER BY name"
    )->fetchAll();

    // Fetch all blood inventory
    $inventory = $pdo->query(
        "SELECT hospital_id, blood_group, quantity
         FROM blood_inventory"
    )->fetchAll();

    // Index inventory by hospital_id
    $stockMap = [];
    foreach ($inventory as $row) {
        $stockMap[$row['hospital_id']][$row['blood_group']] = (int) $row['quantity'];
    }

    // Optional filter by blood group
    $filterBG = isset($_GET['blood_group']) ? trim($_GET['blood_group']) : null;

    $result = [];
    foreach ($hospitals as $h) {
        $stock = $stockMap[$h['id']] ?? [];

        // If filtering, skip hospitals that have 0 stock for requested group
        if ($filterBG !== null) {
            $qty = $stock[$filterBG] ?? 0;
            if ($qty <= 0) {
                continue;
            }
        }

        $result[] = [
            'id'         => $h['id'],
            'name'       => $h['name'],
            'address'    => $h['address'],
            'phone'      => $h['phone'],
            'lat'        => (float) $h['lat'],
            'lng'        => (float) $h['lng'],
            'type'       => 'hospital',
            'bloodStock' => $stock,
        ];
    }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal Server Error']);
}
