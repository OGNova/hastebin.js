import Hastebin  from '../index.js';
const h = new Hastebin({ url: 'https://hasteb.in' });

const args = process.argv;

if (args[2] === 'post') {
  const code = args.slice(3);
  const link = h.post(code.join(' ')).then(link => console.log(`Posted to ${link}`));
}