const { trueLogin, trueOtp, trueSearch, trueLogeOut } = require("./truecaller");

async function command(message) {
  switch (message.command) {
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
        default:
            await message.sendMessage('Please choose an option:', { reply_markup: JSON.stringify({ inline_keyboard: [[{ text: 'ping', callback_data: 'ping' }], [{ text: 'runtime', callback_data: 'runtime' }]] }) });
            break;
  }
}

module.exports = {
  command
};
