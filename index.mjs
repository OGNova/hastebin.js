import * as nodeFetch from 'node-fetch';
const fetch = nodeFetch.default;

export default class Hastebin {
  constructor(options = {}) {
    /**
    * Client Options
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
  * @param {any} code Code to post.
  * @returns {Promise<pending>}
  */
  async post(code) {
    return this._post(code);
  }

  async _post(code) {
    if (!code) throw new Error('You must supply code to upload to a haste service.');
    const res = await fetch(`${this.baseURL}/documents`, {
      method: 'POST',
      body: code
    });
    if (!res.status !== 200) throw new Error('Something went wrong, please try again later.');
    const json = await res.json();
    const url = `${this.baseURL}/${json.key}.js`;
    return url;
  }
}