const Hastebin = require('../src/index.js');
let h;

describe('Basic client', () => {
  h = new Hastebin();
  test('client values', () => {
    expect(typeof(h.options)).toBe('object');
    expect(typeof(h.dev)).toBe('boolean');
    expect(typeof(h.url)).toBe('undefined');
    expect(typeof(h.baseURL)).toBe('string');
  });
});

describe('Advanced client', () => {
  h = new Hastebin({ dev: true, baseURL: 'https://hasteb.in' });
  test('client values', () => {
    expect(typeof(h.options)).toBe('object');
    expect(h.dev).toBe(true);
    expect(h.url).toBe(undefined);
    expect(h.baseURL).toBe('https://hasteb.in');
  });
});

describe('Posting and getting', () => {
  h = new Hastebin({ dev: true, baseURL: 'https://hasteb.in' });
  test('posting', () => {
    h.post('abcdEFGH').then(link => {
      expect(typeof(link)).toBe('string');
    });
  });

  test('getting', () => {
    h.get('rejocivu').then(raw => {
      expect(raw).toBe('Hello World');
    });
  });
});