const request = require('supertest');
const app = require('../src/app');

describe('Task7HD Tests', () => {
  
  test('Health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('empty', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body.tasks).toEqual([]);
  });

  test('create', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' });
    
    expect(response.status).toBe(200);
    expect(response.body.task.title).toBe('Test Task');
    expect(response.body.task.id).toBeDefined();
  });

  test('update', async () => {
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({ title: 'Original Task' });
    
    const taskId = createResponse.body.task.id;
    
    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Updated Task' });
    
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.task.title).toBe('Updated Task');
  });

  test('delete task', async () => {
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task to Delete' });
    
    const taskId = createResponse.body.task.id;
    
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`);
    
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Task deleted');
  });

  test('metrics endpoint', async () => {
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    expect(response.body.requests).toBeDefined();
    expect(response.body.task_count).toBeDefined();
  });

  test('status endpoint', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.version).toBe('1.0.0');
  });

});