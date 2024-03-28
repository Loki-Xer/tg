let env = require("../env");
let prefix = (!env.HANDLERS || env.HANDLERS.trim() == 'null' || env.HANDLERS.trim() == 'false') ? '' : env.HANDLERS.trim();


class Message {
  constructor(client, message) {
    this.client = client;
    this.msg = message;
    this.jid = this.msg.chat.id;
    this.text = this.msg.text || "";
    this.isBot = this.msg.from.is_bot;
    this.chat = this.msg.chat.type;
    this.from = {};
    this.from.jid = this.msg.from.id;
    this.from.name = this.msg.from.first_name;
    this.from.username = this.msg.from.username;
    this.user = {};
    this.user.firstName = this.msg.chat.first_name;
    this.user.username = this.msg.chat.username;
  }
  
  async reply(msg) {
    await this.client.sendMessage(this.jid, msg);
  }
  async sendMessage(chatId, text, options) {
    await this.client.sendMessage(chatId, text, options);
  }
}

module.exports = { Message };
