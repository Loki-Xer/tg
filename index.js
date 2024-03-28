const { TOKEN } = require("./env");
const { Message } = require("./lib/");
const TelegramBot = require('node-telegram-bot-api');

const client = new TelegramBot(TOKEN, { polling: true });

client.on('message', (msg) => {
  let message = new Message(client, msg);
  message.reply(`hy ${message.user.name}`);
});
