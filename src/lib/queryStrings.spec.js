const { queryString } = require('../lib/queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Keeven',
      profession: 'Software Engineer',
    };

    expect(queryString(obj)).toBe('name=Keeven&profession=Software Engineer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Keeven',
      abilities: ['JavaScript', 'HTML', 'CSS'],
    };

    expect(queryString(obj)).toBe('name=Keeven&abilities=JavaScript,HTML,CSS');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Keeven',
      abilities: {
        first: 'JavaScript',
        second: 'HTML',
      },
    };
    expect(() => queryString(obj)).toThrowError();
  });
});
