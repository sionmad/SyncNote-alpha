const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..', 'client')));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /analyze
 * Accepts a request body like: { text: "meeting notes..." }
 * Returns: { summary, actionItems, emailDraft }
 */
app.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Please provide non-empty meeting notes in `text`.' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Server is missing OPENAI_API_KEY.' });
    }

    const prompt = `You are an assistant for business productivity.
Analyze the meeting notes and return strict JSON with this shape:
{
  "summary": "string",
  "actionItems": ["string", "string"],
  "emailDraft": "string"
}
Rules:
- summary: concise paragraph
- actionItems: specific, actionable bullets
- emailDraft: professional follow-up email ready to send

Meeting notes:
${text}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You transform meeting notes into useful business outputs. Respond only with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content || '{}';

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      return res.status(502).json({ error: 'AI response could not be parsed.' });
    }

    const result = {
      summary: parsed.summary || 'No summary generated.',
      actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
      emailDraft: parsed.emailDraft || 'No email draft generated.',
    };

    return res.json(result);
  } catch (error) {
    console.error('Error in /analyze:', error);
    return res.status(500).json({ error: 'Failed to analyze notes. Please try again.' });
  }
});

// Serve the frontend entry point.
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Syncnote-alpha server running at http://localhost:${PORT}`);
});
