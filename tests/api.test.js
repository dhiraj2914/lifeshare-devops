const test = require('node:test');
const assert = require('node:assert/strict');

const BASE_URL = process.env.API_URL || 'http://localhost:8088';

test('Health API: returns 200 and healthy status with DB connected', async () => {
  const res = await fetch(`${BASE_URL}/health.php`);
  assert.equal(res.status, 200, 'Health endpoint should return HTTP 200');

  const data = await res.json();
  assert.equal(data.status, 'healthy');
  assert.equal(data.db, 'connected');
  assert.ok(data.tables >= 4, `Expected at least 4 tables, got ${data.tables}`);
  assert.ok(typeof data.php === 'string', 'PHP version should be present');
});

test('Hospitals API: returns valid JSON array with 6 hospitals and blood stock', async () => {
  const res = await fetch(`${BASE_URL}/api/hospitals.php`);
  assert.equal(res.status, 200, 'Hospitals endpoint should return HTTP 200');

  const data = await res.json();
  assert.ok(Array.isArray(data), 'Response should be an array');
  assert.equal(data.length, 6, 'Seed data should contain 6 hospitals');

  const nims = data.find(h => h.id === 'h1');
  assert.ok(nims, 'NIMS hospital should exist');
  assert.equal(nims.type, 'hospital');
  assert.ok(typeof nims.lat === 'number');
  assert.ok(typeof nims.lng === 'number');
  assert.ok(typeof nims.bloodStock === 'object');
  assert.ok(nims.bloodStock['O+'] >= 10);
});

test('Donors API: returns valid JSON array with registered donors', async () => {
  const res = await fetch(`${BASE_URL}/api/donors.php`);
  assert.equal(res.status, 200, 'Donors endpoint should return HTTP 200');

  const data = await res.json();
  assert.ok(Array.isArray(data), 'Response should be an array');
  assert.ok(data.length >= 8, `Expected at least 8 donors, got ${data.length}`);

  const donor = data[0];
  assert.ok(donor.id, 'Donor should have an id');
  assert.ok(donor.name, 'Donor should have a name');
  assert.ok(donor.bloodGroup, 'Donor should have a bloodGroup');
  assert.equal(typeof donor.available, 'boolean');
});
