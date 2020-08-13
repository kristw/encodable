/* eslint-disable jest/no-test-return-statement */
/* eslint no-console: 0 */
import mockConsole from 'jest-mock-console';
import { Registry, OverwritePolicy } from '../../src';

const loader = () => 'testValue';

describe('Registry', () => {
  let registry: Registry<unknown>;

  beforeEach(() => {
    registry = new Registry();
  });

  it('exists', () => {
    expect(Registry !== undefined).toBe(true);
  });

  describe('new Registry(config)', () => {
    it('can create a new registry when config.name is not given', () => {
      expect(registry).toBeInstanceOf(Registry);
    });
    it('can create a new registry when config.name is given', () => {
      registry = new Registry({ name: 'abc' });
      expect(registry).toBeInstanceOf(Registry);
      expect(registry.store.name).toBe('abc');
    });
  });

  describe('.clear()', () => {
    it('clears all registered items', () => {
      registry.registerValue('a', 'testValue');
      registry.clear();
      expect(Object.keys(registry.store.items)).toHaveLength(0);
      expect(Object.keys(registry.store.promises)).toHaveLength(0);
    });
    it('also resets default key', () => {
      registry.setDefaultKey('abc');
      registry.clear();
      expect(registry.getDefaultKey()).toBeUndefined();
    });
    it('returns the registry itself', () => {
      expect(registry.clear()).toBe(registry);
    });
  });

  describe('.has(key)', () => {
    it('returns true if an item with the given key exists', () => {
      registry.registerValue('a', 'testValue');
      expect(registry.has('a')).toBe(true);
      registry.registerLoader('b', () => 'testValue2');
      expect(registry.has('b')).toBe(true);
    });
    it('returns false if an item with the given key does not exist', () => {
      expect(registry.has('a')).toBe(false);
    });
  });

  describe('.registerValue(key, value)', () => {
    it('registers the given value with the given key', () => {
      registry.registerValue('a', 'testValue');
      expect(registry.has('a')).toBe(true);
      expect(registry.get('a')).toBe('testValue');
    });
    it('does not overwrite if value is exactly the same', () => {
      const value = { a: 1 };
      registry.registerValue('a', value);
      const promise1 = registry.getAsPromise('a');
      registry.registerValue('a', value);
      const promise2 = registry.getAsPromise('a');
      expect(promise1).toBe(promise2);
      registry.registerValue('a', { a: 1 });
      const promise3 = registry.getAsPromise('a');
      expect(promise1).not.toBe(promise3);
    });
    it('overwrites item with loader', () => {
      registry.registerLoader('a', () => 'ironman');
      expect(registry.get('a')).toBe('ironman');
      registry.registerValue('a', 'hulk');
      expect(registry.get('a')).toBe('hulk');
    });
    it('returns the registry itself', () => {
      expect(registry.registerValue('a', 'testValue')).toBe(registry);
    });
  });

  describe('.registerLoader(key, loader)', () => {
    it('registers the given loader with the given key', () => {
      registry.registerLoader('a', () => 'testValue');
      expect(registry.has('a')).toBe(true);
      expect(registry.get('a')).toBe('testValue');
    });
    it('does not overwrite if loader is exactly the same', () => {
      registry.registerLoader('a', loader);
      const promise1 = registry.getAsPromise('a');
      registry.registerLoader('a', loader);
      const promise2 = registry.getAsPromise('a');
      expect(promise1).toBe(promise2);
      registry.registerLoader('a', () => 'testValue');
      const promise3 = registry.getAsPromise('a');
      expect(promise1).not.toBe(promise3);
    });
    it('overwrites item with value', () => {
      registry.registerValue('a', 'hulk');
      expect(registry.get('a')).toBe('hulk');
      registry.registerLoader('a', () => 'ironman');
      expect(registry.get('a')).toBe('ironman');
    });
    it('returns the registry itself', () => {
      expect(registry.registerLoader('a', () => 'testValue')).toBe(registry);
    });
  });

  describe('.get(key?)', () => {
    it('given the key, returns the value if the item is a value', () => {
      registry.registerValue('a', 'testValue');
      expect(registry.get('a')).toBe('testValue');
    });
    it('given the key, returns the result of the loader function if the item is a loader', () => {
      registry.registerLoader('b', () => 'testValue2');
      expect(registry.get('b')).toBe('testValue2');
    });
    it('returns undefined if the item with specified key does not exist', () => {
      expect(registry.get('a')).toBeUndefined();
    });
    it('If the key was registered multiple times, returns the most recent item.', () => {
      registry.registerValue('a', 'testValue');
      expect(registry.get('a')).toBe('testValue');
      registry.registerLoader('a', () => 'newValue');
      expect(registry.get('a')).toBe('newValue');
    });

    describe('with defaultKey', () => {
      beforeEach(() => {
        registry.registerValue('abc', 100).registerValue('def', 200).setDefaultKey('abc');
      });
      it('.get() returns value from default key', () => {
        expect(registry.get()).toEqual(100);
      });
      it('.get(key) returns value from specified key', () => {
        expect(registry.get('def')).toEqual(200);
      });
      it('returns undefined if no key was given and there is no default key', () => {
        registry.clearDefaultKey();
        expect(registry.get()).toBeUndefined();
      });
    });
  });

  describe('.getAsPromise(key)', () => {
    it('given the key, returns a promise of item value if the item is a value', () => {
      registry.registerValue('a', 'testValue');

      return registry.getAsPromise('a').then(value => expect(value).toBe('testValue'));
    });
    it('given the key, returns a promise of result of the loader function if the item is a loader', () => {
      registry.registerLoader('a', () => 'testValue');

      return registry.getAsPromise('a').then(value => expect(value).toBe('testValue'));
    });
    it('returns same promise object for the same key unless user re-registers new value with the key.', () => {
      registry.registerLoader('a', () => 'testValue');
      const promise1 = registry.getAsPromise('a');
      const promise2 = registry.getAsPromise('a');
      expect(promise1).toBe(promise2);
    });
    it('returns a rejected promise if the item with specified key does not exist', () => {
      return registry.getAsPromise('a').then(null, (err: Error) => {
        expect(err.toString()).toEqual('Error: Item with key "a" is not registered.');
      });
    });
    it('If the key was registered multiple times, returns a promise of the most recent item.', () => {
      registry.registerValue('a', 'testValue');
      const promise1 = registry.getAsPromise('a').then(value => expect(value).toBe('testValue'));
      registry.registerLoader('a', () => 'newValue');
      const promise2 = registry.getAsPromise('a').then(value => expect(value).toBe('newValue'));

      return Promise.all([promise1, promise2]);
    });
  });

  describe('.getMap()', () => {
    it('returns key-value map as plain object', () => {
      registry.registerValue('a', 'cat');
      registry.registerLoader('b', () => 'dog');
      expect(registry.getMap()).toEqual({
        a: 'cat',
        b: 'dog',
      });
    });
  });

  describe('.getMapAsPromise()', () => {
    it('returns a promise of key-value map', () => {
      registry.registerValue('a', 'test1');
      registry.registerLoader('b', () => 'test2');
      registry.registerLoader('c', () => Promise.resolve('test3'));

      return registry.getMapAsPromise().then(map =>
        expect(map).toEqual({
          a: 'test1',
          b: 'test2',
          c: 'test3',
        }),
      );
    });
  });

  describe('.getDefaultKey()', () => {
    it('returns defaultKey', () => {
      registry.setDefaultKey('abc');
      expect(registry.getDefaultKey()).toEqual('abc');
    });
  });

  describe('.setDefaultKey(key)', () => {
    it('set the default key', () => {
      registry.setDefaultKey('abc');
      expect(registry.store.defaultKey).toEqual('abc');
    });
    it('returns itself', () => {
      expect(registry.setDefaultKey('ghi')).toBe(registry);
    });
  });

  describe('.clearDefaultKey()', () => {
    it('set the default key to undefined', () => {
      registry.clearDefaultKey();
      expect(registry.store.defaultKey).toBeUndefined();
    });
    it('returns itself', () => {
      expect(registry.clearDefaultKey()).toBe(registry);
    });
  });

  describe('.keys()', () => {
    it('returns an array of keys', () => {
      registry.registerValue('a', 'testValue');
      registry.registerLoader('b', () => 'test2');
      expect(registry.keys()).toEqual(['a', 'b']);
    });
  });

  describe('.values()', () => {
    it('returns an array of values', () => {
      registry.registerValue('a', 'test1');
      registry.registerLoader('b', () => 'test2');
      expect(registry.values()).toEqual(['test1', 'test2']);
    });
  });

  describe('.valuesAsPromise()', () => {
    it('returns a Promise of an array { key, value }', () => {
      registry.registerValue('a', 'test1');
      registry.registerLoader('b', () => 'test2');
      registry.registerLoader('c', () => Promise.resolve('test3'));

      return registry
        .valuesAsPromise()
        .then(entries => expect(entries).toEqual(['test1', 'test2', 'test3']));
    });
  });

  describe('.entries()', () => {
    it('returns an array of { key, value }', () => {
      registry.registerValue('a', 'test1');
      registry.registerLoader('b', () => 'test2');
      expect(registry.entries()).toEqual([
        { key: 'a', value: 'test1' },
        { key: 'b', value: 'test2' },
      ]);
    });
  });

  describe('.entriesAsPromise()', () => {
    it('returns a Promise of an array { key, value }', () => {
      registry.registerValue('a', 'test1');
      registry.registerLoader('b', () => 'test2');
      registry.registerLoader('c', () => Promise.resolve('test3'));

      return registry.entriesAsPromise().then(entries =>
        expect(entries).toEqual([
          { key: 'a', value: 'test1' },
          { key: 'b', value: 'test2' },
          { key: 'c', value: 'test3' },
        ]),
      );
    });
  });

  describe('.remove(key)', () => {
    it('removes the item with given key', () => {
      registry.registerValue('a', 'testValue');
      registry.remove('a');
      expect(registry.get('a')).toBeUndefined();
    });
    it('does not throw error if the key does not exist', () => {
      expect(() => registry.remove('a')).not.toThrow();
    });
    it('returns itself', () => {
      registry.registerValue('a', 'testValue');
      expect(registry.remove('a')).toBe(registry);
    });
  });

  describe('.size()', () => {
    it('returns number of items', () => {
      registry.registerValue('a', 'testValue');
      expect(registry.size()).toEqual(1);
      registry.registerValue('b', 'testValue');
      expect(registry.size()).toEqual(2);
    });
  });

  describe('config.overwritePolicy', () => {
    describe('=ALLOW', () => {
      describe('.registerValue(key, value)', () => {
        it('registers normally', () => {
          const restoreConsole = mockConsole();
          registry.registerValue('a', 'testValue');
          expect(() => registry.registerValue('a', 'testValue2')).not.toThrow();
          expect(registry.get('a')).toEqual('testValue2');
          expect(console.warn).not.toHaveBeenCalled();
          restoreConsole();
        });
      });
      describe('.registerLoader(key, loader)', () => {
        it('registers normally', () => {
          const restoreConsole = mockConsole();
          registry.registerLoader('a', () => 'testValue');
          expect(() => registry.registerLoader('a', () => 'testValue2')).not.toThrow();
          expect(registry.get('a')).toEqual('testValue2');
          expect(console.warn).not.toHaveBeenCalled();
          restoreConsole();
        });
      });
    });
    describe('=WARN', () => {
      describe('.registerValue(key, value)', () => {
        it('warns when overwrite', () => {
          const restoreConsole = mockConsole();
          registry = new Registry({
            overwritePolicy: OverwritePolicy.WARN,
          });
          registry.registerValue('a', 'testValue');
          expect(() => registry.registerValue('a', 'testValue2')).not.toThrow();
          expect(registry.get('a')).toEqual('testValue2');
          expect(console.warn).toHaveBeenCalled();
          restoreConsole();
        });
      });
      describe('.registerLoader(key, loader)', () => {
        it('warns when overwrite', () => {
          const restoreConsole = mockConsole();
          registry = new Registry({
            overwritePolicy: OverwritePolicy.WARN,
          });
          registry.registerLoader('a', () => 'testValue');
          expect(() => registry.registerLoader('a', () => 'testValue2')).not.toThrow();
          expect(registry.get('a')).toEqual('testValue2');
          expect(console.warn).toHaveBeenCalled();
          restoreConsole();
        });
      });
    });
    describe('=PROHIBIT', () => {
      describe('.registerValue(key, value)', () => {
        it('throws error when overwrite', () => {
          registry = new Registry({
            overwritePolicy: OverwritePolicy.PROHIBIT,
          });
          registry.registerValue('a', 'testValue');
          expect(() => registry.registerValue('a', 'testValue2')).toThrow(
            'Item with key "a" already exists. Cannot overwrite.',
          );
        });
      });
      describe('.registerLoader(key, loader)', () => {
        it('warns when overwrite', () => {
          registry = new Registry({
            overwritePolicy: OverwritePolicy.PROHIBIT,
          });
          registry.registerLoader('a', () => 'testValue');
          expect(() => registry.registerLoader('a', () => 'testValue2')).toThrow(
            'Item with key "a" already exists. Cannot overwrite.',
          );
        });
      });
    });
  });

  describe('config.defaultKey', () => {
    describe('when not set', () => {
      it(`After creation, default key is undefined`, () => {
        expect(registry.store.defaultKey).toBeUndefined();
      });
      it('.clear() reset defaultKey to undefined', () => {
        registry.setDefaultKey('abc');
        registry.clear();
        expect(registry.getDefaultKey()).toBeUndefined();
      });
    });
    describe('when config.initialDefaultKey is set', () => {
      const registry2 = new Registry({
        defaultKey: 'def',
      });
      it(`After creation, default key is undefined`, () => {
        expect(registry2.store.defaultKey).toEqual('def');
      });
      it('.clear() reset defaultKey to this config.defaultKey', () => {
        registry2.setDefaultKey('abc');
        registry2.clear();
        expect(registry2.getDefaultKey()).toEqual('def');
      });
    });
  });

  describe('config.version', () => {
    it('sets to 0.x.x by default', () => {
      expect(registry.store.version).toEqual('0.x.x');
    });
    it('sets to specified version', () => {
      const registry2 = new Registry({
        version: '1.x.x',
      });
      expect(registry2.store.version).toEqual('1.x.x');
    });
  });

  describe('config.setFirstItemAsDefault', () => {
    describe('when true', () => {
      const registry2 = new Registry({ setFirstItemAsDefault: true });
      beforeEach(() => {
        registry2.clear();
      });
      describe('.registerValue(key, value)', () => {
        it('sets the default key to this key if default key is not set', () => {
          registry2.registerValue('abc', 100);
          expect(registry2.getDefaultKey()).toEqual('abc');
        });
        it('does not modify the default key if already set', () => {
          registry2.setDefaultKey('def').registerValue('abc', 100);
          expect(registry2.getDefaultKey()).toEqual('def');
        });
        it('returns itself', () => {
          expect(registry2.registerValue('ghi', 300)).toBe(registry2);
        });
      });
      describe('.registerLoader(key, loader)', () => {
        it('sets the default key to this key if default key is not set', () => {
          registry2.registerLoader('abc', () => 100);
          expect(registry2.getDefaultKey()).toEqual('abc');
        });
        it('does not modify the default key if already set', () => {
          registry2.setDefaultKey('def').registerLoader('abc', () => 100);
          expect(registry2.getDefaultKey()).toEqual('def');
        });
        it('returns itself', () => {
          expect(registry2.registerLoader('ghi', () => 300)).toBe(registry2);
        });
      });
    });
    describe('when false', () => {
      const registry2 = new Registry({ setFirstItemAsDefault: false });
      beforeEach(() => {
        registry2.clear();
      });
      describe('.registerValue(key, value)', () => {
        it('does not modify default key', () => {
          registry2.registerValue('abc', 100);
          expect(registry2.store.defaultKey).toBeUndefined();
          registry2.setDefaultKey('def');
          registry2.registerValue('ghi', 300);
          expect(registry2.store.defaultKey).toEqual('def');
        });
        it('returns itself', () => {
          expect(registry2.registerValue('ghi', 300)).toBe(registry2);
        });
      });
      describe('.registerLoader(key, loader)', () => {
        it('does not modify default key', () => {
          registry2.registerValue('abc', () => 100);
          expect(registry2.store.defaultKey).toBeUndefined();
          registry2.setDefaultKey('def');
          registry2.registerValue('ghi', () => 300);
          expect(registry2.store.defaultKey).toEqual('def');
        });
        it('returns itself', () => {
          expect(registry2.registerLoader('ghi', () => 300)).toBe(registry2);
        });
      });
    });
  });

  describe('config.global', () => {
    it('refer to the global object with same id', () => {
      const r1 = new Registry({ globalId: 'test1' });
      r1.registerValue('a', 100);
      const r2 = new Registry({ globalId: 'test1' });
      expect(r2.get('a')).toEqual(100);
    });
  });
});
