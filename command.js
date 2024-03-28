
async function command(message) {
  switch (message.text) {
        case "ping":
            const start = new Date().getTime();
            await message.reply("```Ping!```");
            const end = new Date().getTime();
            return await message.reply("*Pong!*\n ```" + (end - start) + "``` *ms*");
            break;
        default:
            message.reply("hi");
            break;
  }
}

module.exports = {
  command
};
