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
            await this.client.sendPhoto(this.jid, content, options);
            break;
        case 'video':
            await this.client.sendVideo(this.jid, content, options);
            break;
        case 'audio':
            await this.client.sendAudio(this.jid, content, options);
            break;
        case 'animation':
            await this.client.sendAnimation(this.jid, content, options);
            break;
        default:
            await this.client.sendMessage(this.jid, content, options);
            break;
    }
  }
}

module.exports = { Message };
