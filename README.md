# hastebin.js

A NPM package to post data to hastebin.

Due to how node-fetch works, you canot await the `post` function, you must use [#then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) to resolve the promise that's returned.

## Example Usage

```js
const hastebin = require('hastebin.js');

const haste = new hastebin({ /* dev: true, url: 'hastebin.com */ });

const link = haste.post('Helllo from hastebin.js!').then(link => console.log(link));
// Will return a link such as https://hastebin.com/sofomuqifo.js
```

## Documentation

* [Hastebin](#Hastebin)
  * _instance_
    * [.post(opts)](#Hastebin+post) ⇒ `{Promise<Pending>}`


<a name="Hastebin+post"></a>

### Hastebin.post

| Param | Type | Description
| --- | --- | --- |
| opts | <code>string</code> | Required. The string that you want to post to Hastebin.