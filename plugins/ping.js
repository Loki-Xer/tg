const { addCommand } = require("../lib/");

addCommand(
  {
    pattern: "ping",
    fromMe: false,
    desc: "To check ping",
    type: "user",
  },
  async (message) => {
    const start = new Date().getTime();
    await message.reply("```Ping!```");
    const end = new Date().getTime();
    return await message.reply("*Pong!*\n ```" + (end - start) + "``` *ms*");
  }
);
