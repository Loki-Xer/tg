const { TOKEN } = require("./environment")
const TelegramBot = require('node-telegram-bot-api');


const client = new TelegramBot(TOKEN, { polling: true });


client.on('message', (msg) => {
  const chatId = msg.chat.id;
  client.sendMessage(chatId, 'Hello! I am your Telegram bot.');
});
