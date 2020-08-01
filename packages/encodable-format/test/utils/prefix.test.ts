import { addPrefix, removePrefix, addSign } from '../../src/utils/prefix';

describe('prefix', () => {
  describe('addPrefix(prefix, value)', () => {
    it('adds prefix in front', () => {
      expect(addPrefix('prefix:', 'abc')).toEqual('prefix:abc');
    });
    it('does not add if already exists', () => {
      expect(addPrefix('prefix:', 'prefix:abc')).toEqual('prefix:abc');
    });
  });
  describe('removePrefix(prefix, value)', () => {
    it('remove prefix', () => {
      expect(removePrefix('prefix:', 'prefix:abc')).toEqual('abc');
    });
    it('does not add if no prefix', () => {
      expect(removePrefix('prefix:', 'abc')).toEqual('abc');
    });
  });
  describe('addSign(value)', () => {
    it('adds sign in front', () => {
      expect(addSign('.2f')).toEqual('+.2f');
    });
    it('does not add if already exists', () => {
      expect(addSign('+.2f')).toEqual('+.2f');
    });
  });
});
