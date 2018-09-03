const fetch = require('node-fetch');

module.exports = class Hastebin {
  /**
   * @typedef {Object} ClientOptions
   * @property {Boolean} [dev=false]
   * @memberof Hastebin
   */

  /**
  * @param {ClientOptions} [options] Client options 
  */
  constructor(options = {}) {
    /**
    * Client options
    * @type {object} 
    */
    this.options = options;
    /**
    * Whether or not to use hasteb.in
    * @type {Boolean} 
    */
    this.dev = options.dev || false;
    /**
    * Base URL for Hastebin client.
    * @type {string} 
    */
    this.baseURL = options.url || this.dev ? 'https://hasteb.in' : 'https://hastebin.com';
  }

  /**
  * @param {string} opts Code to post.
  * @returns {Promise<pending>} 
  */
  async post(code) {
    return this._post(code);
  }

  async _post(code) {
    if (!code) throw new Error('You must supply code to upload to hastebin.');
    const res = await fetch(`${this.baseURL}/documents`, {
      method: 'POST',
      body: code
    });
    const json = await res.json();
    const url = `${this.baseURL}/${json.key}.js`;
    return url;
  }
};