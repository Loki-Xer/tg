const env = require("../env");
const axios = require("axios");
const fs = require('fs').promises;
const fileType = require('file-type');
const types = ['photo', 'document', 'sticker', 'animation', 'video', 'text'];

class Message {
  constructor(client, message, prefix) {
    this.client = client;
    this.msg = message;
    this.prefix = prefix;
    this.type = types.find(t => this.msg?.[t]) || null;
    if (this.type) {
      this.photo = this.type === "photo" ? this.msg[this.type] : false;
      this.video = this.type === "video" ? this.msg[this.type] : false;
      this.document = this.type === "document" ? this.msg[this.type] : false;
      this.sticker = this.type === "sticker" ? this.msg[this.type] : false;
      this.animation = this.type === "animation" ? this.msg[this.type] : false; 
      this.text = this.type === "text" ? this.msg[this.type] : false;
    }
    this.message = {};
    this.message.id = message.message_id;
    this.message.type = this.msg?.[this.type]; 
    this.message.isGroup = this.msg?.chat?.type !== "private";
    this.jid = this.msg?.chat?.id;
    this.body = this.msg?.text || null;
    this.isBot = this.msg?.from?.is_bot;
    this.chat = this.msg?.chat?.type;
    this.sender = {};
    this.sender.jid = this.msg?.from?.id;
    this.sender.name = this.msg?.from?.first_name;
    this.sender.username = this.msg?.from?.username;
    this.user = {};
    this.user.firstName = this.msg?.chat?.first_name;
    this.user.username = this.msg?.chat?.username;
    this.admin = env.ADMIN ? env.ADMIN.split(',').map(item => item.trim()).includes(String(this.sender.jid)) : false;
    if (this.msg?.reply_to_message) {
      this.quoted = {};
      this.quoted.msg = this.msg.reply_to_message;
      this.quoted.body = this.quoted.msg?.text;
      this.quoted.type = types.find(t => this.quoted.msg?.[t]) || null;
      this.quoted.message = {};
      this.quoted.message.id = this.quoted.msg?.message_id;
      this.quoted.message.type = this.quoted.msg?.[this.quoted.type] || null;
      this.quoted.download = async () => await this.download(this.quoted.msg);
      this.quoted.downloadAndSave = async () => await this.downloadAndSave(this.quoted.msg);
      if (this.quoted.type) {
        this.quoted.photo = this.quoted.type === "photo" ? this.quoted.msg[this.quoted.type] : false;
        this.quoted.video = this.quoted.type === "video" ? this.quoted.msg[this.quoted.type] : false;
        this.quoted.document = this.quoted.type === "document" ? this.quoted.msg[this.quoted.type] : false;
        this.quoted.sticker = this.quoted.type === "sticker" ? this.quoted.msg[this.quoted.type] : false;
        this.quoted.animation = this.quoted.type === "animation" ? this.quoted.msg[this.quoted.type] : false;
        this.quoted.text = this.quoted.type === "text" ? this.quoted.msg[this.quoted.type] : false;
      }
    } else {
      this.quoted = !!this.msg?.reply_to_message;
    }
  }
  
  async reply(msg) {
    try {
      return await this.client.sendMessage(this.jid, msg, { reply_to_message_id: this.message.id, parse_mode: "Markdown" });
    } catch (error) {
      console.error('Error replying to message:', error);
    }
  }

  async send(content, options = {}) {
    try {
      switch (options.type) {
        case 'photo':
          return await this.client.sendPhoto(this.jid, content, options);
        case 'video':
          return await this.client.sendVideo(this.jid, content, options);
        case 'sticker':
          return await this.client.sendSticker(this.jid, content, options);
        case 'edit':
          return await this.client.editMessageText(content, options);
        case 'audio':
          return await this.client.sendAudio(this.jid, content, options);
        case 'animation':
          return await this.client.sendAnimation(this.jid, content, options);
        default:
          return await this.client.sendMessage(this.jid, content, options);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async download(m) {
    try {
      const type = types.find(t => m?.[t]);
      if (!type) return null;
      const fileId = m[type];
      const fileData = (type === "photo") ? fileId[fileId.length - 1].file_id : fileId.file_id;
      const file = await this.client.getFileLink(fileData);
      const response = await axios.get(file, { responseType: 'arraybuffer' });
      return response.data;
    } catch (error) {
      console.error('Error downloading file:', error);
      return null;
    }
  }

  async downloadAndSave(msg) {
    try {
      const buffer = await this.download(msg);
      if (!buffer) return null;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let filename = '';
      for (let i = 0; i < 8; i++) {
        filename += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      const type = await fileType.fromBuffer(buffer);
      if (type) {
        const extension = type.ext;
        filename = `${filename}.${extension}`;
        while (await fs.access(filename).then(() => true).catch(() => false)) {
          filename = Array.from({ length: 8 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('') + `.${extension}`;
        }
        await fs.writeFile(filename, buffer);
        console.log('File saved successfully.');
        return filename;
      } else {
        console.error('File type not detected.');
        return null;
      }
    } catch (error) {
      console.error('Error saving file:', error);
      return null;
    }
  }
}

module.exports = { Message };
