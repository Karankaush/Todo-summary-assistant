const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { summarizeTodos } = require('../controllers/summarizeController');
const { sendToSlack } = require('../services/slackService');


router.post('/', async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false });
    const summary = await summarizeTodos(todos);
    const slackResponse = await sendToSlack(summary);
    
    res.json({
      message: 'Summary generated and sent to Slack',
      summary,
      slackResponse
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;