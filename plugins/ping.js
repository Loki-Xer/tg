const { addCommand } = require("../lib/");

module.exports = (client) => {
    addCommand(
        {
            pattern: "ping",
            fromMe: false,
            desc: "Check the bot's ping",
            type: "user",
        },
        async (message, match) => {
            const start = new Date().getTime();
            await message.sendMessage(message.jid, "```Pinging...```");
            const end = new Date().getTime();
            return await message.sendMessage(message.jid,
                "*Pong!*\n ```" + (end - start) + "``` *ms*"
            );
        }
    );
};
