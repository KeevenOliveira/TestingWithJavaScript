import { queryString } from '../lib/queryString';
import { parse } from '../lib/queryString';

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

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const queryString = 'name=Keeven&profession=Software Engineer';

    expect(parse(queryString)).toEqual({
      name: 'Keeven',
      profession: 'Software Engineer',
    });
  });

  it('should convert a query string of a single key-value pair', () => {
    const queryString = 'name=Keeven';

    expect(parse(queryString)).toEqual({
      name: 'Keeven',
    });
  });

  it('should convert a query string to an object taking care of comma separated of array', () => {
    const queryString = 'name=Keeven&abilities=JavaScript,HTML';

    expect(parse(queryString)).toEqual({
      name: 'Keeven',
      abilities: ['JavaScript', 'HTML'],
    });
  });
});
