# Syncnote Alpha

Syncnote Alpha は、会議メモの生テキストを次の内容に変換する軽量な Web アプリです。

- 簡潔な要約
- 実行可能な次のアクション
- そのまま送信できるフォローアップメール案

シンプルな静的フロントエンド（`client/`）と、OpenAI API を利用する Express バックエンド（`server/`）で構成されています。

## 機能

- ブラウザ UI に会議メモを貼り付け
- ワンクリックでメモを解析
- 構造化された AI 出力:
  - `summary`
  - `actionItems`
  - `emailDraft`
- クライアント/サーバー両方でのバリデーションとエラーハンドリング

## 技術スタック

- Node.js
- Express
- OpenAI Node SDK
- 素の HTML / CSS / JavaScript

## 前提条件

- Node.js 18 以上（推奨）
- OpenAI API キー

## はじめに

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 環境変数を設定

`.env.example` を `.env` にコピーします。

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

その後、`.env` に値を設定します。

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

`PORT` は任意です。デフォルトは `3000` です。

### 3. アプリを起動

開発モード（nodemon）:

```bash
npm run dev
```

本番相当モード:

```bash
npm start
```

ブラウザで `http://localhost:3000` を開いてください。

## NPM スクリプト

- `npm start` - Express サーバーを起動
- `npm run dev` - ローカル開発用に nodemon で起動

## API

### `POST /analyze`

リクエストボディ:

```json
{
  "text": "Meeting notes go here..."
}
```

成功レスポンス:

```json
{
  "summary": "string",
  "actionItems": ["string", "string"],
  "emailDraft": "string"
}
```

例:

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"We reviewed Q2 goals and assigned follow-ups.\"}"
```

よくあるエラー:

- `400` - `text` が未指定または空
- `500` - `OPENAI_API_KEY` の未設定、またはサーバーエラー
- `502` - AI 応答を JSON としてパースできなかった

## 動作の仕組み

1. フロントエンドが `POST /analyze` にメモを送信します。
2. バックエンドが `gpt-4o-mini` に厳密な JSON 出力を要求します。
3. バックエンドがレスポンスをパースし、フィールドを正規化します。
4. フロントエンドが要約・アクション項目・メール案を表示します。

## プロジェクト構成

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

## ライセンス

MIT
