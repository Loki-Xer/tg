const { trueLogin, trueOtp, trueSearch, trueLogeOut } = require("./truecaller");

async function command(message) {
  switch (message.command) {
       case "ping":
            const start = new Date().getTime();
            await message.reply("```Ping!```");
            const end = new Date().getTime();
            await message.reply("*Pong!*\n ```" + (end - start) + "``` *ms*");
            break;
        case "runtime":
            const duration = process.uptime();
            const seconds = Math.floor(duration % 60);
            const minutes = Math.floor((duration / 60) % 60);
            const hours = Math.floor((duration / (60 * 60)) % 24);
            await message.reply(`_*Runtime: ${hours.toString().padStart(2, "0")} hours ${minutes.toString().padStart(2, "0")} minutes ${seconds.toString().padStart(2, "0")} seconds*_`);
            break;
        case "logout":
            await trueLogeOut(message);
            await message.reply("truecaller logouted, successfully");
            break;
        case "sarch":
            const data = await trueSearch(message, message.match[0]);
            await message.reply(data);
            break;
        case "login":
            const login = await trueLogin(message, message.match[0]);
            await message.reply(login);
            break;
        case "otp":
            const otp = await trueOtp(message, message.match[0]);
            await message.reply(otp);
            break;
       case "match":
            await message.reply(message.match[0]);
            break;
        default:
            await message.sendMessage('Please choose an option:', { reply_markup: JSON.stringify({ inline_keyboard: [[{ text: 'ping', callback_data: 'ping' }], [{ text: 'runtime', callback_data: 'runtime' }]] }) });
            break;
  }
}

module.exports = {
  command
};
