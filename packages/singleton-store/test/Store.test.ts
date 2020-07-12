import mockConsole, { RestoreConsole } from 'jest-mock-console';
import Store from '../src/Store';

describe('Store', () => {
  const store = new Store();

  let restoreConsole: RestoreConsole;

  beforeEach(() => {
    restoreConsole = mockConsole();
  });

  afterEach(() => {
    restoreConsole();
  });

  describe('.get(key)', () => {
    it('return value if exists', () => {
      store.set('key1', 'value1');
      expect(store.get<string>('key1')).toEqual('value1');
    });
    it('return undefined if not', () => {
      expect(store.get<number | string>('invalid-key')).toBeUndefined();
    });
  });
  describe('getOrCreate()', () => {
    it('gets if exists', () => {
      const v1 = store.getOrCreate('abc1', () => ({
        abc: 1,
      }));
      const v2 = store.getOrCreate('abc1', () => ({
        abc: 1,
      }));
      expect(v1).toBe(v2);
    });
    it('creates and returns if not', () => {
      expect(
        store.getOrCreate('abc2', () => ({
          abc: 2,
        })),
      ).toEqual({
        abc: 2,
      });
    });
  });
  describe('.has(key)', () => {
    it('return true if exists', () => {
      store.set('key2', 'value2');
      expect(store.has('key2')).toBeTruthy();
    });
    it('return false if not', () => {
      expect(store.has('invalid-key')).toBeFalsy();
    });
  });
  describe('.set(key, value)', () => {
    it('sets value', () => {
      store.set('key3', 'value3');
      expect(store.get<string>('key3')).toEqual('value3');
    });
    it('sets value on existing key', () => {
      store.set('existing-key', 1245686);
      store.set('existing-key', 1566094);
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalled();
    });
    it('returns store', () => {
      expect(store.set('key4', 123)).toBe(store);
    });
  });
  describe('.remove(key)', () => {
    it('sets value', () => {
      store.set('key5', 'value5');
      store.remove('key5');
      expect(store.has('key5')).toBeFalsy();
    });
    it('returns store', () => {
      expect(store.remove('key6')).toBe(store);
    });
  });
});
