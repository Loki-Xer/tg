const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require("./env");
const { Message } = require("./lib/");

const app = express();
const port = process.env.PORT || 3000;

const client = new TelegramBot(TOKEN, { polling: true });
console.log("starting !!");

client.on('message', async (msg) => {
  try {
    let message = new Message(client, msg);
    console.log(msg);
    await message.reply("wroking");
  } catch (error) {
    console.error('Error handling message:', error);
    process.exit(1); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
