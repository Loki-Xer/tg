const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require("./env");
const { Message, command } = require("./lib/");

const app = express();
const port = process.env.PORT || 3000;

const client = new TelegramBot(TOKEN, { polling: true });
console.log("starting !!");

client.on('message', async (msg) => {
  try {
    if (!msg) return;
    let message = new Message(client, msg);
    message.command = message.text.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    let match = message.text.trim().split(/ +/).slice(1);
    if (message.isBot) return;
      await command(message, match);
    if (message.text) {
      console.log("tg bot"),
        console.log("[ MESSAGE ]"),
        console.log(new Date()),
        console.log(message.user.firstName),
        console.log(msg.text)
    }
  } catch (error) {
    console.error('Error handling message:', error);
    process.exit(1); 
  }
});

client.on('callback_query', async (callbackQuery) => {
  try {
    if (!msg) return;
    let message = new Message(client, msg);
    message.text = callbackQuery.data;
    message.command = message.text.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    let match = message.text.trim().split(/ +/).slice(1);
    if (message.isBot) return;
      await command(message, match);
    if (message.text) {
      console.log("tg bot"),
        console.log("[ MESSAGE ]"),
        console.log(new Date()),
        console.log(msg.pushName),
        console.log(msg.text)
    }
  } catch (error) {
    console.error('Error handling message:', error);
    process.exit(1); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
