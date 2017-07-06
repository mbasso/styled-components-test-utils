import getCodeBlock from '../../src/utils/getCodeBlock';

describe('getCodeBlock', () => {
  test('should not throw if code is not valid', () => {
    let result;
    expect(() => {
      result = getCodeBlock('foo');
    }).not.toThrow();
    expect(result).toEqual('');
  });
});
