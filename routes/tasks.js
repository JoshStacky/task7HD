const express = require('express');
const router = express.Router();

//  Home
router.get('/', (req, res) => {
    res.send(`
        <h1>Task7HD</h1>
        <p>This is my application is was deployed using Jenkins and Docker.</p>
        <a href="/health">Check Health Status</a>
    `);
});

// check
router.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        message: 'Task7HD ran successfully',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;