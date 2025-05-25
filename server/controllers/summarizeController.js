const Todo = require('../models/Todo');
const { generateSummary } = require('../services/llmService');
const { sendToSlack } = require('../services/slackService');

const summarizeAndSend = async (req, res) => {
  try {

    const todos = await Todo.find({ completed: false }).sort({ createdAt: -1 });

    if (todos.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No pending todos to summarize',
        summary: null,
        slackResponse: null
      });
    }

   
    const summary = await generateSummary(todos);
    

    const slackResponse = await sendToSlack(summary);

    res.status(200).json({
      success: true,
      message: 'Summary generated and sent to Slack successfully',
      summary,
      slackResponse
    });

  } catch (err) {
    console.error('Error in summarizeAndSend:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Failed to generate and send summary'
    });
  }
};

module.exports = {
  summarizeAndSend
};