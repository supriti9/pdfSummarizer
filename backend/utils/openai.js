const fetch = require('node-fetch');
require('dotenv').config();

async function getSummarys(text) {
  const prompt = `Summarize the following PDF content in a concise way:\n\n${text.slice(0, 3000)}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an assistant that summarizes documents.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.5
    })
  });

  const data = await res.json();
  return data.choices[0].message.content.trim();
}

module.exports = { getSummarys };
