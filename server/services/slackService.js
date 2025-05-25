const axios = require('axios');

async function sendToSlack(message) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('Slack webhook URL not configured');
  }

  try {
    const response = await axios.post(webhookUrl, {
      text: message,
      username: 'Todo Summary Bot',
      icon_emoji: ':robot_face:'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending to Slack:', error);
    throw error;
  }
}

module.exports = { sendToSlack };