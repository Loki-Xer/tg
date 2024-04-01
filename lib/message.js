const env = require("../env");
const axios = require("axios");
const fs = require('fs').promises;
const fileType = require('file-type');
const types = ['photo', 'document', 'sticker', 'animation', 'video'];

class Message {
  constructor(client, message, prefix) {
    this.client = client;
    this.msg = message;
    this.prefix = prefix;
    this.message = {};
    this.message.id = message.message_id;
    this.message.type = this.msg + types.find(t => this.msg && this.msg[t]);
    this.message.isGroup = this.msg.chat.type !== "private";
    this.jid = this.msg.chat.id;
    this.type = types.find(t => this.msg && this.msg[t]);
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
    this.quoted = !!this.msg.reply_to_message;
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
        case 'sticker':
            return await this.client.sendSticker(this.jid, content, options);
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

  async download(m) {
    try {
        const type = types.find(t => m && m[t]);
        if (!type) return null;      
        const fileId = m[type];
        const fileData = (type === "photo") ? fileId[fileId.length - 1].file_id : fileId.file_id;
        const file = await this.client.getFileLink(fileData);
        const response = await axios.get(file, { responseType: 'arraybuffer' });

        // returning the downloaded file as buff
        return response.data

        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error downloading file:', error);
        return null;
    }
  }

  async downloadAndSave(msg) {
    try {
        const buffer = await this.download(msg);
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
