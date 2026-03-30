# Syncnote Alpha

Syncnote Alpha is a lightweight web app that turns raw meeting notes into:

- a concise summary
- actionable next steps
- a ready-to-send follow-up email draft

It uses a simple static frontend (`client/`) and an Express backend (`server/`) powered by the OpenAI API.

## Features

- Paste meeting notes into the browser UI
- Analyze notes in one click
- Structured AI output:
  - `summary`
  - `actionItems`
  - `emailDraft`
- Client and server validation/error handling

## Tech Stack

- Node.js
- Express
- OpenAI Node SDK
- Vanilla HTML, CSS, and JavaScript

## Prerequisites

- Node.js 18+ (recommended)
- OpenAI API key

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then set values in `.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

`PORT` is optional. Default is `3000`.

### 3. Run the app

Development mode (nodemon):

```bash
npm run dev
```

Production-style run:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## NPM Scripts

- `npm start` - starts the Express server
- `npm run dev` - starts with nodemon for local development

## API

### `POST /analyze`

Request body:

```json
{
  "text": "Meeting notes go here..."
}
```

Success response:

```json
{
  "summary": "string",
  "actionItems": ["string", "string"],
  "emailDraft": "string"
}
```

Example:

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"We reviewed Q2 goals and assigned follow-ups.\"}"
```

Common errors:

- `400` - missing or empty `text`
- `500` - missing `OPENAI_API_KEY` or server failure
- `502` - AI response could not be parsed as JSON

## How It Works

1. Frontend sends notes to `POST /analyze`.
2. Backend prompts `gpt-4o-mini` for strict JSON output.
3. Backend parses and normalizes response fields.
4. Frontend renders summary, action items, and email draft.

## Project Structure

```text
syncnote-alpha/
  client/
    index.html
    app.js
    styles.css
  server/
    index.js
  .env.example
  package.json
  README.md
```

## License

MIT
