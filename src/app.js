const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let tasks = [];

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/metrics', (req, res) => {
  res.json({
    requests: 0,
    task_count: tasks.length
  });
});

app.get('/status', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0'
  });
});

app.get('/api/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), title: req.body.title, status: 'pending' };
  tasks.push(task);
  res.json({ task: task });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (task) {
    task.title = req.body.title || task.title;
    res.json({ task: task });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json({ message: 'Task deleted', task: deletedTask });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;