const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Message, command } = require("./lib/");
const env = require("./env");
const path = require("path"); 
const prefix = (!env.HANDLERS || env.HANDLERS.trim() === 'null' || env.HANDLERS.trim() === 'false') ? '' : env.HANDLERS.trim();
const fs = require("fs");
const cmds = require("./lib/events");

const app = express();
const port = process.env.PORT || 3000;

const client = new TelegramBot(env.TOKEN, { polling: true });
console.log("Bot started!");

console.log("🔀 Installing Plugins...");

fs.readdirSync(path.join(__dirname, "/plugins")).forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() === ".js") {
    try {
      const pluginPath = path.join(__dirname, "/plugins/", plugin);
      require(pluginPath); // Load the plugin
      console.log(`Plugin loaded: ${plugin}`); // Log the plugin name
    } catch (e) {
      console.error(`Error loading plugin ${plugin}:`, e);
      fs.unlinkSync(path.join(__dirname, '/plugins/', plugin)); 
    }
  }
});

console.log("✅ Plugins Installed!");

client.on('message', async (msg) => {
  try {
    if (!msg) return;
    const message = new Message(client, msg, prefix);
    if (message.isBot) return;
    if (message.admin) {
      if (message.text.startsWith(prefix)) {
        message.command = message.text.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
        message.match = message.text.toLowerCase().replace(message.command, '').replace(prefix, "").trim();
      } else if (message.text.startsWith(">")) {
        const code = message.text.replace(">", "");
        try {
          let m = message;
          let evaled = await eval(`(async () => { ${code} })()`);
          if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
          return await message.send(evaled);
        } catch (error) {
          await message.send(`Error executing code: ${error.message}`);
        }
      }
    }
    if (message.admin && message.text.startsWith(prefix)) {
      cmds.commands.forEach(async (command) => {
        if (command.pattern && command.pattern.replace(/[^a-zA-Z0-9-+]/g, '')) {
          const EventCmd = prefix + command.pattern.replace(/[^a-zA-Z0-9-+]/g, ''); // Declare EventCmd variable
          if (message.text.toLowerCase().startsWith(EventCmd)) {
            try {
              await command.function(message);
            } catch (e) {
              console.log(e);
            }
          }
        }
      });
    }
    if (!message.admin) {
      await client.sendMessage(msg.chat.id, "<b>Ask admin for sudo to use Doraemon</b> \n\n <i>Your ID: " + msg.chat.id + "</i> \n <b>Admin: <a href=\"https://wa.me/917025673121\">Loki-Xer</a></b>", {
        parse_mode: "HTML",
        disable_web_page_preview: true
      });
    }

    console.log("[TG BOT MESSAGE]");
    console.log(new Date());
    console.log(message.user.firstName);
    console.log(msg.text);

  } catch (error) {
    console.error('Error handling message:', error);
  }
});

client.on('callback_query', async (callbackQuery) => {
  try {
    if (!callbackQuery) return;
    const message = new Message(client, callbackQuery.message, prefix);
    message.action = prefix + callbackQuery.data;
    message.command = message.action.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
    message.match = message.action.toLowerCase().replace(message.command.toLowerCase(), '').trim();
    if (message.action.startsWith(prefix)) {
      await command(message);
    }

    console.log("[TG BOT CALLBACK QUERY]");
    console.log(new Date());
    console.log(message.user.firstName);
    console.log(callbackQuery.data);

  } catch (error) {
    console.error('Error handling callback query:', error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
