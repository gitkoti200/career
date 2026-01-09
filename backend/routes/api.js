const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Middleware to extract user_id (Mocked for now or passed in header/body)
// In a real scenario, you'd verify the JWT token here.
const getUserId = (req) => req.body.user_id || req.headers['x-user-id'];

// POST /analyze-resume
router.post('/analyze-resume', async (req, res) => {
    try {
        const { text } = req.body;
        const userId = getUserId(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const result = await aiService.analyzeResume(userId, text || "");
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /recommend
router.post('/recommend', async (req, res) => {
    try {
        const userProfile = req.body;
        const userId = getUserId(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const result = await aiService.recommendCareers(userId, userProfile);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /roadmap
router.post('/roadmap', async (req, res) => {
    try {
        const { career } = req.body;
        const userId = getUserId(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const result = await aiService.generateRoadmap(userId, career);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /chat
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const result = await aiService.chatWithAI(message);
        res.json({ reply: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
