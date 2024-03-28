const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require("./env");
const { Message } = require("./lib/");

const app = express();
const port = process.env.PORT || 3000;

const client = new TelegramBot(TOKEN, { polling: true });
console.log("Starting bot...");
const commands = [];


const loadPlugins = async () => {
    const fs = require("fs").promises;
    const path = require("path");
    const pluginDir = path.join(__dirname, "plugins");

    try {
        const files = await fs.readdir(pluginDir);
        files.filter(file => file.endsWith(".js")).forEach(file => {
            const plugin = require(path.join(pluginDir, file));
            if (typeof plugin === 'function') {
                plugin(client);
                console.log(`Loaded plugin: ${file}`);
            } else {
                console.error(`Error loading plugin ${file}: Not a function`);
            }
        });
    } catch (error) {
        console.error("Error loading plugins:", error);
    }
};


client.on('message', async (msg) => {
    try {
        if (!msg || msg.isBot) return;
        
        const message = new Message(client, msg);
        for (const command of commands) {
            if (command.pattern && command.pattern.test(message.text)) {
                await command.function(message);
            }
        }
    } catch (error) {
        console.error('Error handling message:', error);
        process.exit(1); 
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    loadPlugins();
});
