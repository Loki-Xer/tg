const { TOKEN } = require("./env");
const { message } require("./lib/");
const TelegramBot = require('node-telegram-bot-api');


const client = new TelegramBot(TOKEN, { polling: true });


client.on('message', (msg) => {
  let message = new message(client, msg);
  message.reply(`hy ${message.user.name}`);
});
