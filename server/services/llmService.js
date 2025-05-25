const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateSummary(todos) {
  const todoList = todos.map(todo => `- ${todo.title}: ${todo.description}`).join('\n');
  
  const prompt = `Please summarize the following to-do items in a concise, motivational way. 
  Group similar items if possible and suggest priorities. Here are the todos:\n\n${todoList}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful productivity assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

module.exports = { generateSummary };