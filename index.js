const fetch = require('node-fetch');

module.exports = class Hastebin {
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
    *  Supplied Haste client URL.
    * @type {String}
    */
    this.url = options.url;

    /**
     * Base URL for Hastebin client.
     * @type {string}
     */
    this.baseURL = this.url ? this.url : 'https://hasteb.in';
  }

  /**
  * @param {any} code Code to post.
  * @returns {Promise<pending>} 
  */
  async post(code) {
    return this._post(code);
  }

  async _post(code) {
    if (typeof(this.baseURL) !== 'string') throw new Error('The haste service must be a string.');
    if (!code) throw new Error('You must supply code to upload to a haste service.');
    const res = await fetch(`${this.baseURL}/documents`, {
      method: 'POST',
      body: code
    });
    const json = await res.json();
    const url = `${this.baseURL}/${json.key}.js`;
    return url;
  }
};