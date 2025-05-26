const request = require('supertest');
const app = require('../src/app');

test('Health check should work', async () => {
  const response = await request(app).get('/health');
  expect(response.status).toBe(200);
  expect(response.body.status).toBe('healthy');
});

test('Should get empty tasks list', async () => {
  const response = await request(app).get('/api/tasks');
  expect(response.status).toBe(200);
  expect(response.body.tasks).toEqual([]);
});

test('Should create a new task', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .send({ title: 'Test Task' });
  
  expect(response.status).toBe(200);
  expect(response.body.task.title).toBe('Test Task');
});