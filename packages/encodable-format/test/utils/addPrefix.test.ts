import addPrefix from '../../src/utils/addPrefix';

describe('addPrefix()', () => {
  it('adds sign in front', () => {
    expect(addPrefix('prefix:', 'abc')).toEqual('prefix:abc');
  });
  it('does not add if already exists', () => {
    expect(addPrefix('prefix:', 'prefix:abc')).toEqual('prefix:abc');
  });
});
