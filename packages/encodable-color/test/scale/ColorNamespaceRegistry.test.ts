import { ColorNamespaceRegistry } from '../../src/scale';

describe('ColorNamespaceRegistry', () => {
  describe('constructor', () => {
    it('basic', () => {
      const registry = new ColorNamespaceRegistry();
      expect(registry).toBeDefined();
    });
    it('with existing store', () => {
      const registry1 = new ColorNamespaceRegistry({ globalId: '@encodable/test-namespace-reg' });
      registry1.setDefaultNamespace('haha');
      const registry2 = new ColorNamespaceRegistry({ globalId: '@encodable/test-namespace-reg' });
      expect(registry2).toBeDefined();
      expect(registry2.getDefaultNamespace()).toEqual('haha');
    });
  });
  describe('.has(namespace)', () => {
    it('returns true if the namespace exists', () => {
      const registry = new ColorNamespaceRegistry();
      registry.get('test1');
      expect(registry.has('test1')).toBeTruthy();
    });
    it('returns false otherwise', () => {
      const registry = new ColorNamespaceRegistry();
      expect(registry.has('test1')).toBeFalsy();
    });
  });
  describe('.get(namespace)', () => {
    it('creates store and instance if both do not exist', () => {
      const registry = new ColorNamespaceRegistry();
      expect(registry.get('test1')).toBeDefined();
    });
    it('creates only instance if store exist', () => {
      const registry1 = new ColorNamespaceRegistry({
        globalId: '@encodable/test-namespace-reg-get',
      });
      registry1.get('haha');
      const registry2 = new ColorNamespaceRegistry({
        globalId: '@encodable/test-namespace-reg-get',
      });
      expect(registry2.get('haha')).toBeDefined();
    });
    it('just returns otherwise', () => {
      const registry = new ColorNamespaceRegistry();
      registry.get('test1');
      expect(registry.get('test1')).toBeDefined();
    });
  });
  describe('.keys()', () => {
    it('returns namespace names', () => {
      const registry = new ColorNamespaceRegistry();
      registry.get('test1');
      registry.get('test2');
      expect(registry.keys()).toEqual(['test1', 'test2']);
    });
  });
  describe('.clear()', () => {
    it('clears all namespace', () => {
      const registry = new ColorNamespaceRegistry();
      registry.get('test1');
      registry.get('test2');
      registry.clear();
      expect(registry.keys()).toHaveLength(0);
    });
  });
  describe('.remove(namespace)', () => {
    it('removes specific namespace', () => {
      const registry = new ColorNamespaceRegistry();
      registry.get('test1');
      registry.get('test2');
      registry.remove('test1');
      expect(registry.keys()).toEqual(['test2']);
    });
  });
});
