const Hastebin = require('../src/index.js');
let h;

describe('Basic client', () => {
  h = new Hastebin();
  test('client values', () => {
    expect(typeof(h.options)).toBe('object');
    expect(typeof(h.dev)).toBe('boolean');
    expect(typeof(h.baseURL)).toBe('string');
  });
});

describe('Advances client', () => {
  h = new Hastebin({ dev: true, baseURL: 'https://hasteb.in' });
  test('client values', () => {
    expect(typeof(h.options)).toBe('object');
    expect(h.dev).toBe(true);
    expect(h.baseURL).toBe('https://hasteb.in');
  });
});