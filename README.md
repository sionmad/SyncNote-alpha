# Syncnote Alpha

Syncnote Alpha is a lightweight web app that turns raw meeting notes into:

- a concise summary
- actionable next steps
- a ready-to-send follow-up email draft

It uses a static frontend (`client/`) and an Express backend (`server/`) with local processing only.

## Features

- Paste meeting notes into the browser UI
- Analyze notes in one click
- Switch output language from the UI
- Structured output:
  - `summary`
  - `actionItems`
  - `emailDraft`
- Client and server validation/error handling
- No external AI/API calls required

Supported output languages:

- `en` English
- `ja` Japanese
- `zh` Chinese
- `ko` Korean
- `es` Spanish
- `fr` French
- `ar` Arabic
- `hi` Hindi
- `ru` Russian

## Tech Stack

- Node.js
- Express
- Vanilla HTML, CSS, and JavaScript

## Cost

- API cost: `0` (no OpenAI/API usage)
- Runs locally on your machine

## Prerequisites

- Node.js 18+ (recommended)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables (optional)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Set values in `.env` if needed:

```env
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
  "text": "Meeting notes go here...",
  "language": "en"
}
```

Success response:

```json
{
  "language": "en",
  "summary": "string",
  "actionItems": ["string", "string"],
  "emailDraft": "string"
}
```

Example:

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"We reviewed Q2 goals and assigned follow-ups.\",\"language\":\"es\"}"
```

Common errors:

- `400` - missing or empty `text`
- `500` - server-side processing error

## How It Works

1. Frontend sends notes to `POST /analyze`.
2. Backend creates a short summary from the note text.
3. Backend extracts likely action items from bullet points and task-like phrases.
4. Backend generates a follow-up email draft template.
5. Frontend renders summary, action items, and email draft.

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
  README.ja.md
```

## License

MIT
