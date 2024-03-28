const { TOKEN } = require("./environment")
const TelegramBot = require('node-telegram-bot-api');


const client = new TelegramBot(TOKEN, { polling: true });


client.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
  console.log(chatId);
  console.log("Bot Started!");
  client.sendMessage(chatId, "hy");
});
