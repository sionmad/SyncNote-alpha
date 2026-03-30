# Syncnote Alpha

Syncnote Alpha は、会議メモの生テキストを次の内容に変換する軽量な Web アプリです。

- 簡潔な要約
- 実行可能な次のアクション
- そのまま送信できるフォローアップメール案

静的フロントエンド（`client/`）と Express バックエンド（`server/`）で動作し、解析はローカル処理のみで行います。

## 機能

- ブラウザ UI に会議メモを貼り付け
- ワンクリックで解析
- UI から出力言語を切り替え
- 構造化された出力:
  - `summary`
  - `actionItems`
  - `emailDraft`
- クライアント/サーバー両方でのバリデーションとエラーハンドリング
- 外部AI/API呼び出しなし

対応出力言語:

- `en` 英語
- `ja` 日本語
- `zh` 中国語
- `ko` 韓国語
- `es` スペイン語
- `fr` フランス語
- `ar` アラビア語
- `hi` ヒンディー語
- `ru` ロシア語

## 技術スタック

- Node.js
- Express
- 素の HTML / CSS / JavaScript

## コスト

- API料金: `0`（OpenAI/APIを使用しません）
- ローカルPC上で完結して動作

## 前提条件

- Node.js 18 以上（推奨）

## はじめに

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 環境変数を設定（任意）

`.env.example` を `.env` にコピーします。

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

必要であれば `.env` に設定します。

```env
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
  "text": "Meeting notes go here...",
  "language": "en"
}
```

成功レスポンス:

```json
{
  "language": "en",
  "summary": "string",
  "actionItems": ["string", "string"],
  "emailDraft": "string"
}
```

例:

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"We reviewed Q2 goals and assigned follow-ups.\",\"language\":\"es\"}"
```

よくあるエラー:

- `400` - `text` が未指定または空
- `500` - サーバー側の処理エラー

## 動作の仕組み

1. フロントエンドが `POST /analyze` にメモを送信します。
2. バックエンドがメモから短い要約を作成します。
3. 箇条書きやタスクらしい文からアクション項目を抽出します。
4. フォローアップメール案をテンプレート生成します。
5. フロントエンドが結果を表示します。

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
  README.ja.md
```

## ライセンス

MIT
