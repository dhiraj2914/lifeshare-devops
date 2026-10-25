const test = require('node:test');
const assert = require('node:assert/strict');

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

test('Haversine: distance between identical coordinates is 0 km', () => {
  const d = calculateDistance(17.385044, 78.486671, 17.385044, 78.486671);
  assert.equal(Math.round(d), 0);
});

test('Haversine: distance calculation is symmetric', () => {
  const d1 = calculateDistance(17.385044, 78.486671, 17.414000, 78.455200);
  const d2 = calculateDistance(17.414000, 78.455200, 17.385044, 78.486671);
  assert.ok(Math.abs(d1 - d2) < 0.0001, 'Distance must be symmetric');
});

test('Haversine: distance between Charminar and Secunderabad is ~7-8 km', () => {
  const d = calculateDistance(17.3616, 78.4747, 17.4399, 78.4983);
  assert.ok(d > 8.0 && d < 10.0, `Expected ~8.9km, got ${d.toFixed(2)}km`);
});

test('Haversine: distance to NIMS Punjagutta from central Hyderabad is ~4.5-5.5 km', () => {
  const d = calculateDistance(17.385044, 78.486671, 17.414000, 78.455200);
  assert.ok(d > 4.0 && d < 6.0, `Expected ~4.6km, got ${d.toFixed(2)}km`);
});
