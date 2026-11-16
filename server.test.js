const test = require('node:test');
const assert = require('node:assert');
const app = require('./server');

test('health and create task', async () => {
  const server = app.listen(0);
  const base = `http://localhost:${server.address().port}`;
  try {
    let r = await fetch(`${base}/health`);
    assert.strictEqual(r.status, 200);
    r = await fetch(`${base}/tasks`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'learn azure' }),
    });
    assert.strictEqual(r.status, 201);
  } finally {
    server.close();
  }
});