const { Telegraf } = require('telegraf');
const { TOKEN } = require("./environment")


const bot = new Telegraf(token);


bot.on('text', (ctx) => {
  ctx.reply(ctx);
});


bot.launch();
