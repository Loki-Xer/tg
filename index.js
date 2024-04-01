const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Message, command } = require("./lib/");
let env = require("./env");
let prefix = (!env.HANDLERS || env.HANDLERS.trim() == 'null' || env.HANDLERS.trim() == 'false') ? '' : env.HANDLERS.trim();

const app = express();
const port = process.env.PORT || 3000;


const client = new TelegramBot(env.TOKEN, { polling: true });
console.log("Bot started!");

client.on('message', async (msg) => {
  try {
    if (!msg) return;
    let message = new Message(client, msg);
    message.command = message.text.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    message.match = message.text.toLowerCase().replace(message.command.toLowerCase(), '').trim();
    if (message.isBot) return;
    await command(message);
    if (message.text) {
      console.log("[TG BOT MESSAGE]");
      console.log(new Date());
      console.log(message.user.firstName);
      console.log(msg.text);
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
});

client.on('callback_query', async (callbackQuery) => {
  try {
    if (!callbackQuery) return;
    let message = new Message(client, callbackQuery.message);
    message.action = callbackQuery.data;
    message.command = message.action.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    message.match = message.action.toLowerCase().replace(message.command.toLowerCase(), '').trim();
    if (!message.isBot) return;
    await command(message);
    if (message.action) {
      console.log("[TG BOT CALLBACK QUERY]");
      console.log(new Date());
      console.log(message.user.firstName);
      console.log(callbackQuery.data);
    }
  } catch (error) {
    console.error('Error handling callback query:', error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
