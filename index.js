const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Message, command } = require("./lib/");
const env = require("./env");
const prefix = (!env.HANDLERS || env.HANDLERS.trim() === 'null' || env.HANDLERS.trim() === 'false') ? '' : env.HANDLERS.trim();

const app = express();
const port = process.env.PORT || 3000;

const client = new TelegramBot(env.TOKEN, { polling: true });
console.log("Bot started!");

client.on('message', async (msg) => {
  try {
    if (!msg) return;
    let message = new Message(client, msg, prefix);
    message.command = message.text.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    message.match = message.text.toLowerCase().replace(message.command, '').replace(prefix, "").trim();
    if (message.isBot) return;
    if (message.text.startsWith(">")) {
      let code = message.text.replace(">", "");
      try {
        let m = message;
        let evaled = await eval(`(async () => { ${code} })()`);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        return await message.send(evaled);
      } catch (error) {
        await message.send(`Error executing code: ${error.message}`);
      }
    }
    if (message.text.startsWith(prefix) && message.admin && message.command) {
       await command(message);
    }
    if (!message.admin) {
       return await client.sendMessage(msg.chat.id, "<b>ask admin for sudo to use doraemon</b> \n\n <i>your id : " + msg.chat.id + "</i> \n <b>admin ser <a href=\"https://wa.me/917025673121\">Loki-Xer</a></b>", { 
        parse_mode: "HTML",
        disable_web_page_preview: true
      });
    }
    if (msg.text) {
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
    let message = new Message(client, callbackQuery.message, prefix);
    message.action = prefix + callbackQuery.data;
    message.command = message.action.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    message.match = message.action.toLowerCase().replace(message.command.toLowerCase(), '').trim();
    if (!message.isBot) return;
    if (message.action.startsWith(prefix)) {
        await command(message);
    }
    if (callbackQuery.data) {
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
