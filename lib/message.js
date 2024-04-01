const env = require("../env");

class Message {
  constructor(client, message, prefix) {
    this.client = client;
    this.msg = message;
    this.prefix = prefix;
    this.message = {};
    this.message.id = message.message_id;
    this.jid = this.msg.chat.id;
    this.text = this.msg.text || "";
    this.isBot = this.msg.from.is_bot;
    this.chat = this.msg.chat.type;
    this.sender = {};
    this.sender.jid = this.msg.from.id;
    this.sender.name = this.msg.from.first_name;
    this.sender.username = this.msg.from.username;
    this.user = {};
    this.user.firstName = this.msg.chat.first_name;
    this.user.username = this.msg.chat.username;
    this.admin = env.ADMIN ? env.ADMIN.split(',').map(item => item.trim()).includes(String(this.sender.jid)) : false;
  }
  
  async reply(msg) {
    return await this.client.sendMessage(this.jid, msg, { reply_to_message_id: this.message.id, parse_mode: "Markdown" });
  }

  /**
   * Sends a message with the specified content and options.
   * @param {string} content - The content to be sent (e.g., URL or text).
   * @param {Object} [options={}] - Additional options for sending the message.
   * @param {string} [options.type] - The type of message to send ('photo', 'video', 'audio', 'animation', or undefined for text messages).
   * @param {string} [options.caption] - Caption for the message (applicable for photos, videos, and animations).
   * @returns {void}
   */
  async send(content, options = {}) {
    switch (options.type) {
        case 'photo':
            return await this.client.sendPhoto(this.jid, content, options);
        case 'video':
            return await this.client.sendVideo(this.jid, content, options);
        case 'editi':
            return await this.client.editMessageText(content, options);
        case 'audio':
            return await this.client.sendAudio(this.jid, content, options);
        case 'animation':
            return await this.client.sendAnimation(this.jid, content, options);
        default:
            return await this.client.sendMessage(this.jid, content, options);
    }
  }
}

module.exports = { Message };
