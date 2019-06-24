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
    if (typeof (this.baseURL) !== 'string') throw new Error('The haste service must be a string.');
    if (!code) throw new Error('You must supply code to upload to a haste service.');
    if (!extension) extension = 'js';
    if (!validExtensions.includes(extension)) throw new Error(`Invalid file type, please use one of the following. ${validExtensions.join(', ')}`);
    const res = await fetch(`${this.baseURL}/documents`, {
      method: 'POST',
      body: code
    });
    await this.checkStatus(res);
    const json = await res.json();
    const url = `${this.baseURL}/${json.key}.${extension}`;
    return url;
  }

  async _get(key) {
    if (typeof (this.baseURL) !== 'string') throw new Error('The haste service must be a string.');
    const res = await fetch(`${this.baseURL}/raw/${key}`);
    await this.checkStatus(res);
    const json = await res.text();
    return json;
  }

  async checkStatus(res) {
    if (res.status >= 401 && res.status <= 504) {
      switch (res.status) {
        case '401':
          throw new Error('Error 401: Something went wrong, and the request was not authorized. Please try again later.');
        case '403':
          throw new Error('Error 403: Something went wrong, and we were not able to access the document. Please try again later.');
        case '404':
          throw new Error('Error 404: The document you are trying to get no longer exists. Please check your spelling and try again.');
        case '408':
          throw new Error('Error 408: The request timed out, please try again later.');
        case '429':
          throw new Error('Error 429: The server received too many requests, and has ratelimited the client. Please try again later.');
        case '451':
          throw new Error('Error 451: The server administrator has denied access to this document due to legal reasons.');

        case '500':
          throw new Error('Error 500: Something went wrong, please try again later.');
        case '501':
          throw new Error('Error 501: Something went wrong, please try again later.');
        case '502':
          throw new Error('Error 502: Bad gateway. Please try again later.');
        case '503':
          throw new Error('Error 503: The server could not handle the request at this time. Please try again later.');
        case '504':
          throw new Error('Error 504: The gateway timed out, please try again later.');
      }
    }
  }
}