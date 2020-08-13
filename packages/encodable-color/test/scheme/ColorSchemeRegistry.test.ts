import { ColorSchemeRegistry } from '../../src/scheme';

describe('ColorSchemeRegistry', () => {
  describe('new ColorSchemeRegistry()', () => {
    it('creates a new registry', () => {
      const registry = new ColorSchemeRegistry();
      expect(registry).toBeDefined();
      expect(registry.categorical).toBeDefined();
      expect(registry.sequential).toBeDefined();
      expect(registry.diverging).toBeDefined();
    });
  });

  describe('functions', () => {
    let registry: ColorSchemeRegistry;

    beforeEach(() => {
      registry = new ColorSchemeRegistry();
    });

    describe('.get()', () => {
      it('returns value', () => {
        registry.registerValue('something', {
          id: 'something',
          type: 'categorical',
          colors: ['red', 'green', 'blue'],
        });
        expect(registry.get('something')).toBeDefined();
      });
      it('returns undefined otherwise', () => {
        expect(registry.get('nothing')).toBeUndefined();
      });
    });

    describe('.clear()', () => {
      it('clears all items and child registries', () => {
        registry.registerValue('abc', {
          id: 'abc',
          type: 'categorical',
          colors: ['red', 'green', 'blue'],
        });
        registry.clear();
        expect(registry.keys()).toHaveLength(0);
        expect(registry.categorical.keys()).toHaveLength(0);
      });
    });
    describe('.registerValue()', () => {
      it('registers to both registry and child registry', () => {
        const colors = ['red', 'green', 'blue'];
        registry.registerValue('abc', {
          id: 'abc',
          type: 'categorical',
          colors,
        });
        expect(registry.get('abc')?.colors).toEqual(colors);
        expect(registry.categorical.get('abc')?.colors).toEqual(colors);
      });
      it('does nothing for invalid scheme', () => {
        // @ts-ignore check default case
        registry.registerValue('abc', {
          id: 'abc',
          colors: ['red', 'green', 'blue'],
        });
        expect(registry.has('abc')).toBeFalsy();
        expect(registry.categorical.has('abc')).toBeFalsy();
        expect(registry.sequential.has('abc')).toBeFalsy();
        expect(registry.diverging.has('abc')).toBeFalsy();
      });
    });
    describe('.registerLoader()', () => {
      it('registers to both registry and child registry', () => {
        const colors = ['red', 'green', 'blue'];
        registry.registerLoader('abc', () => ({
          id: 'abc',
          type: 'categorical',
          colors,
        }));
        expect(registry.get('abc')?.colors).toEqual(colors);
        expect(registry.categorical.get('abc')?.colors).toEqual(colors);
      });
      it('does nothing for invalid scheme', () => {
        // @ts-ignore check default case
        registry.registerLoader('xyz', () => ({
          id: 'abc',
          colors: ['red', 'green', 'blue'],
        }));
        expect(registry.has('xyz')).toBeFalsy();
        expect(registry.categorical.has('xyz')).toBeFalsy();
        expect(registry.sequential.has('xyz')).toBeFalsy();
        expect(registry.diverging.has('xyz')).toBeFalsy();
      });
    });
    describe('.remove()', () => {
      it('removes from both registry and child registry', () => {
        registry.registerValue('abc', {
          id: 'abc',
          type: 'categorical',
          colors: ['red', 'green', 'blue'],
        });

        registry.remove('abc');
        expect(registry.has('abc')).toBeFalsy();
        expect(registry.categorical.has('abc')).toBeFalsy();
      });
    });
    describe('child registries (categorical/sequential/diverging)', () => {
      describe('.clear() clear child registry and those items from the main registry', () => {
        beforeEach(() => {
          registry
            .registerValue('abc', {
              id: 'abc',
              type: 'categorical',
              colors: ['red', 'green', 'blue'],
            })
            .registerValue('def', {
              id: 'def',
              type: 'diverging',
              colors: ['red', 'white', 'blue'],
            })
            .registerValue('ghe', {
              id: 'ghe',
              type: 'sequential',
              colors: ['red', 'orange', 'yellow'],
            });
        });
        it('categorical', () => {
          registry.categorical.clear();
          expect(registry.categorical.keys()).toHaveLength(0);
          expect(registry.keys()).toHaveLength(2);
        });
        it('sequential', () => {
          registry.sequential.clear();
          expect(registry.sequential.keys()).toHaveLength(0);
          expect(registry.keys()).toHaveLength(2);
        });
        it('diverging', () => {
          registry.diverging.clear();
          expect(registry.diverging.keys()).toHaveLength(0);
          expect(registry.keys()).toHaveLength(2);
        });
      });
      describe('.registerValue()', () => {
        it('categorical', () => {
          const colors = ['red', 'green', 'blue'];
          registry.categorical.registerValue('abc', {
            id: 'abc',
            type: 'categorical',
            colors,
          });
          expect(registry.has('abc')).toBeTruthy();
          expect(registry.categorical.has('abc')).toBeTruthy();
        });
        it('sequential', () => {
          const colors = ['red', 'green', 'blue'];
          registry.sequential.registerValue('abc', {
            id: 'abc',
            type: 'sequential',
            colors,
          });
          expect(registry.has('abc')).toBeTruthy();
          expect(registry.sequential.has('abc')).toBeTruthy();
        });
        it('diverging', () => {
          const colors = ['red', 'green', 'blue'];
          registry.diverging.registerValue('abc', {
            id: 'abc',
            type: 'diverging',
            colors,
          });
          expect(registry.has('abc')).toBeTruthy();
          expect(registry.diverging.has('abc')).toBeTruthy();
        });
      });
      describe('.registerLoader()', () => {
        it('categorical', () => {
          const colors = ['red', 'green', 'blue'];
          registry.categorical.registerLoader('abc', () => ({
            id: 'abc',
            type: 'categorical',
            colors,
          }));
          expect(registry.has('abc')).toBeTruthy();
          expect(registry.categorical.has('abc')).toBeTruthy();
        });
        it('sequential', () => {
          const colors = ['red', 'green', 'blue'];
          registry.sequential.registerLoader('abc', () => ({
            id: 'abc',
            type: 'sequential',
            colors,
          }));
          expect(registry.has('abc')).toBeTruthy();
          expect(registry.sequential.has('abc')).toBeTruthy();
        });
        it('diverging', () => {
          const colors = ['red', 'green', 'blue'];
          registry.diverging.registerLoader('abc', () => ({
            id: 'abc',
            type: 'diverging',
            colors,
          }));
          expect(registry.has('abc')).toBeTruthy();
          expect(registry.diverging.has('abc')).toBeTruthy();
        });
      });
      describe('.remove() removes from both registry and child registry', () => {
        it('categorical', () => {
          registry.registerValue('abc', {
            id: 'abc',
            type: 'categorical',
            colors: ['red', 'green', 'blue'],
          });
          registry.categorical.remove('abc');
          expect(registry.has('abc')).toBeFalsy();
          expect(registry.categorical.has('abc')).toBeFalsy();
        });
        it('sequential', () => {
          registry.registerValue('abc', {
            id: 'abc',
            type: 'sequential',
            colors: ['red', 'green', 'blue'],
          });
          registry.sequential.remove('abc');
          expect(registry.has('abc')).toBeFalsy();
          expect(registry.sequential.has('abc')).toBeFalsy();
        });
        it('diverging', () => {
          registry.registerValue('abc', {
            id: 'abc',
            type: 'diverging',
            colors: ['red', 'green', 'blue'],
          });
          registry.diverging.remove('abc');
          expect(registry.has('abc')).toBeFalsy();
          expect(registry.diverging.has('abc')).toBeFalsy();
        });
      });
    });
  });
});
