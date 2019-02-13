import Hastebin  from '../index.js';
const h = new Hastebin({ dev: true });

const args = process.argv;

if (args[2] === 'post') {
  const code = args.slice(3).join(' ');
  const link = h.post(code).then(link => console.log(`Posted to ${link}`));
}