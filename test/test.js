const t = require('tape');

t.onFinish(() => {
  console.log('We finished successfully! 🎉🎉🎉');
});

t('Importing and initalizing', t => {
  t.plan(7);
  const options = { dev: true, url: 'https://cancer-co.de'};

  t.comment('Import hastebin.js');
  const Hastebin = require('../src/index.js');

  t.equal(typeof Hastebin, 'function', 'Hastebin class is valid');

  t.comment('Initialize empty');
  const emptyHaste = new Hastebin();

  t.equal(emptyHaste.dev, false, 'dev is false');
  t.equal(emptyHaste.url, undefined, 'url is undefined');
  t.equal(emptyHaste.baseURL, 'https://hasteb.in', 'baseURL is the default one');

  t.comment('Initialize with options');

  const fullHaste = new Hastebin(options);

  t.equal(fullHaste.dev, true, 'dev is true');
  t.equal(fullHaste.url, 'https://cancer-co.de', 'url is defined');
  t.equal(fullHaste.baseURL, 'https://cancer-co.de', 'baseURL is the provided one');
});

t('Posting and getting', t => {
  t.plan(2);
  t.timeoutAfter(60000);
  const Hastebin = require('../src/index.js');
  const haste = new Hastebin();
  let code;
  haste.post('abcdEFGH').then(c => t.equal(typeof c, 'string', 'ID provided by server is OK'));
  haste.get('yivahenu').then(c => t.equal(c, 'hello-world!', 'Code received is the same with the one sent'));
});