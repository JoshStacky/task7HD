const express = require('express');
const router = express.Router();

// storage
let tasks = [];
let requestCount = 0;

// Count
router.use((req, res, next) => {
    requestCount++;
    next();
});

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Status endpoint
router.get('/status', (req, res) => {
    res.json({ status: 'healthy', version: '1.0.0' });
});

// Metrics
router.get('/metrics', (req, res) => {
    res.json({ requests: requestCount, task_count: tasks.length });
});

// Task API
router.get('/api/tasks', (req, res) => {
    res.json({ tasks: tasks });
});

router.post('/api/tasks', (req, res) => {
    const task = { id: Date.now(), title: req.body.title, completed: false };
    tasks.push(task);
    res.json({ task: task });
});

router.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'not found' });
    
    task.title = req.body.title || task.title;
    res.json({ task: task });
});

router.delete('/api/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'not found' });
    
    tasks.splice(index, 1);
    res.json({ message: 'Deleted' });
});

module.exports = router;