const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const natural = require('natural');
const sbd = require('sbd');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/customer', customerRoutes);




const OPENAI_API_KEY = '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'; // Your OpenAI API key here

// Rephrasing Endpoint using OpenAI GPT-3
app.post('/rephrase', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: text,
        max_tokens: 150,
        temperature: 0.5,
        n: 1,
        stop: ['\n'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const rephrasedText = response.data.choices[0].text.trim();
    res.json({ rephrasedText });
  } catch (error) {
    console.error('Error rephrasing text:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = app;
