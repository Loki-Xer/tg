class message {
  constructor(client, message) {
    this.client = client;
    this.jid = message.chat.id;
    this.text = message.text;
    this.isBot = message.from.is_bot;
    this.chat = message.chat.type;
    this.from = new Object();
    this.from.jid = message.from.id;
    this.from.name = message.from.first_name;
    this.message.userName = message.from.username;
    this.user = new Object();
    this.user.pushName = message.chat.first_name;
    this.user.username = message.chat.username;
  }
  
  async reply(msg) {
        await this.client.sendMessage(this.jid, msg);
  }
}

module.exports = { message };
