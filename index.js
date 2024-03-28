const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require("./env");
const { Message } = require("./lib/");

const app = express();
const port = process.env.PORT || 3000;

const client = new TelegramBot(TOKEN, { polling: true });

client.on('message', async (msg) => {
    //let message = new Message(client, msg);
   //await message.reply(msg);
    const chatId = msg.chat.id;
    client.sendMessage(chatId, 'Received your message');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
