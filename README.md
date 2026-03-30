# Syncnote-alpha

Syncnote-alpha is an AI-powered productivity web application that transforms raw meeting notes into:

- **Concise summaries**
- **Actionable to-do lists**
- **Ready-to-send professional follow-up emails**

## Features

- Paste meeting notes into a clean web interface
- Analyze notes using an Express backend + OpenAI API
- Receive structured results:
  - Summary
  - Action items (bullet points)
  - Email draft
- Basic validation and error handling in both frontend and backend

## Tech Stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js, Express
- **AI:** OpenAI API (`gpt-4o-mini`)
- **Config:** dotenv (`.env`)

## Project Structure

```text
syncnote-alpha/
├── client/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── server/
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd SyncNote-alpha
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Environment Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Add your OpenAI API key in `.env`:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```

## Run Locally

- Development mode (auto-reload):

  ```bash
  npm run dev
  ```

- Production mode:

  ```bash
  npm start
  ```

Then open: `http://localhost:3000`

## API Endpoint

### `POST /analyze`

Request body:

```json
{ "text": "Your meeting notes here..." }
```

Response body:

```json
{
  "summary": "...",
  "actionItems": ["...", "..."],
  "emailDraft": "..."
}
```

## Future Improvements

- Add authentication and user accounts
- Save note history to a database
- Add streaming responses for faster perceived performance
- Support exporting results to Notion/Slack/email providers
- Add tests (unit + integration)

