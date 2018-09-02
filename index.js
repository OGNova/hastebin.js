const fetch = require('node-fetch');

module.exports = class Hastebin {
  constructor(options = {}) {
    this.options = options;
    this.dev = options.dev || false;
    this.baseURL = options.url || this.dev ? 'https://hasteb.in' : 'https://hastebin.com';
  }

  async post(opts) {
    return this._post(opts);
  }

  async _post(opts) {
    const code = opts.splice(1).join(' ');
    if (!code) throw new Error('You must supply code to upload to hastebin.');
    const res = await fetch(`${this.baseURL}/documents`, { method: 'POST', body: code });
    const json = await res.json();
    const url = `${this.baseURL}/${json.key}.js`;
    return url;
  }
};