# 🤖 tg-bot

A simple, lightweight Telegram bot built with Node.js using `node-telegram-bot-api`, kept online with PM2.

## ✨ Features

- Built on `node-telegram-bot-api`
- Express server for HTTP handling
- File type detection with `file-type`
- Runs 24/7 with PM2
- Easy to deploy and extend

## 📋 Requirements

- [Node.js](https://nodejs.org/) v16 or higher
- A Telegram bot token from [@BotFather](https://t.me/BotFather)

## 🚀 Setup

### 1. Clone the repo

```bash
git clone https://github.com/Loki-Xer/tg.git
cd tg
```

### 2. Add your BotFather token

Create a `.env` file in the project root:

```env
BOT_TOKEN=your_botfather_token_here
```

> Get a token by messaging [@BotFather](https://t.me/BotFather) on Telegram and sending `/newbot`.

### 3. Install and start

```bash
npm install && npm start
```

## 🛠 Commands

| Command        | Description                |
| -------------- | -------------------------- |
| `npm start`    | Start the bot with PM2     |
| `npm run stop` | Stop the bot               |

Useful PM2 commands:

```bash
pm2 logs tg-bot     # view logs
pm2 restart tg-bot  # restart the bot
```

## ⚠️ Security

Never commit your `.env` file or share your bot token. Add `.env` to your `.gitignore`.

## 📄 License

Made by [Loki-Xer](https://github.com/Loki-Xer).
