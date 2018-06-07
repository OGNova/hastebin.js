const { post } = require('snekfetch');

module.exports = class Hastebin {
  constructor() {

  }

  async post(code) {
    const { body } = await post("https://hastebin.com/documents").send(code).catch(console.error);
    const url = `https://hastebin.com/${body.key}.js`
    return url;
  }
} 