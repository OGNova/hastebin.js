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
  async post(code, extension) {
    return this._post(code, extension);
  }


  /** 
  * @param {string} key File to fetch.
  * @returns {Promise<pending>} 
  */
  async get(key) {
    return this._get(key);
  }

  async _post(code, extension) {
    const validExtensions = ['bat', 'c', 'cpp', 'css', 'html', 'ini', 'java', 'js', 'jsx', 'json', 'lua', 'md', 'php', 'py', 'pyc', 'scss', 'sql', 'xml'];
    if (typeof(this.baseURL) !== 'string') throw new Error('The haste service must be a string.');
    if (!code) throw new Error('You must supply code to upload to a haste service.');
    if (!validExtensions.includes(extension)) throw new Error(`Invalid file type, please use one of the following. ${validExtensions.join(', ')}`);
    const res = await fetch(`${this.baseURL}/documents`, {
      method: 'POST',
      body: code
    });
    const json = await res.json();
    const url = `${this.baseURL}/${json.key}.${extension}`;
    return url;
  }

  async _get(key) {
    if (typeof(this.baseURL) !== 'string') throw new Error('The haste service must be a string.');
    const res = await fetch(`${this.baseURL}/raw/${key}`);
    const json = await res.text();
    return json;
  }
};