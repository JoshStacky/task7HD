const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let tasks = [];

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), title: req.body.title, status: 'pending' };
  tasks.push(task);
  res.json({ task: task });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;