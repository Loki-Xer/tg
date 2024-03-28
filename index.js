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
    if (!msg) return;
    let message = new Message(client, msg);
    if (message.isBot) return;
      if (message.text === "ping") {
          const start = new Date().getTime();
          await message.reply("```Ping!```");
          const end = new Date().getTime();
          return await message.reply("*Pong!*\n ```" + (end - start) + "``` *ms*");
      } else {
          await message.reply(`wroking ${message.text}`);
      }
  } catch (error) {
    console.error('Error handling message:', error);
    process.exit(1); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
