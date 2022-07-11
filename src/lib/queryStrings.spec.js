const { queryString } = require('../lib/queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Keeven',
      profession: 'Software Engineer',
    };

    expect(queryString(obj)).toBe('name=Keeven&profession=Software Engineer');
  });
});
