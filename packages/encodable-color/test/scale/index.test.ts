import { getColorNamespace, getScale, getColor } from '../../src/scale';
import { getColorSchemeRegistry } from '../../src';
import { DEFAULT_NAMESPACE } from '../../src/scale/ColorNamespaceRegistry';

describe('Categorical scale & namespace', () => {
  beforeAll(() => {
    getColorSchemeRegistry()
      .registerValue('testColors', {
        type: 'categorical',
        id: 'testColors',
        colors: ['red', 'green', 'blue'],
      })
      .registerValue('testColors2', {
        type: 'categorical',
        id: 'testColors2',
        colors: ['red', 'green', 'blue'],
      });
  });
  describe('getColorNamespace()', () => {
    it('returns default namespace if name is not specified', () => {
      const namespace = getColorNamespace();
      expect(namespace !== undefined).toBe(true);
      expect(namespace.name).toBe(DEFAULT_NAMESPACE);
    });
    it('returns namespace with specified name', () => {
      const namespace = getColorNamespace('myNamespace');
      expect(namespace !== undefined).toBe(true);
      expect(namespace.name).toBe('myNamespace');
    });
    it('returns existing instance if the name already exists', () => {
      const ns1 = getColorNamespace('myNamespace');
      const ns2 = getColorNamespace('myNamespace');
      expect(ns1).toBe(ns2);
      const ns3 = getColorNamespace();
      const ns4 = getColorNamespace();
      expect(ns3).toBe(ns4);
    });
  });
  describe('getScale()', () => {
    it('getScale() returns a CategoricalColorScale with default scheme in default namespace', () => {
      const scale = getScale();
      expect(scale).toBeDefined();
      const scale2 = getColorNamespace().getScale();
      expect(scale).toBe(scale2);
    });
    it('getScale(scheme) returns a CategoricalColorScale with specified scheme in default namespace', () => {
      const scale = getScale('testColors');
      expect(scale).toBeDefined();
      const scale2 = getColorNamespace().getScale('testColors');
      expect(scale).toBe(scale2);
    });
    it('getScale(scheme, namespace) returns a CategoricalColorScale with specified scheme in specified namespace', () => {
      const scale = getScale('testColors', 'test-getScale');
      expect(scale).toBeDefined();
      const scale2 = getColorNamespace('test-getScale').getScale('testColors');
      expect(scale).toBe(scale2);
    });
  });
  describe('getColor()', () => {
    it('getColor(value) returns a color from default scheme in default namespace', () => {
      const value = 'dog';
      const color = getColor(value);
      const color2 = getColorNamespace().getScale().getColor(value);
      expect(color).toBe(color2);
    });
    it('getColor(value, scheme) returns a color from specified scheme in default namespace', () => {
      const value = 'dog';
      const scheme = 'testColors';
      const color = getColor(value, scheme);
      const color2 = getColorNamespace().getScale(scheme).getColor(value);
      expect(color).toBe(color2);
    });
    it('getColor(value, scheme, namespace) returns a color from specified scheme in specified namespace', () => {
      const value = 'dog';
      const scheme = 'testColors';
      const namespace = 'test-getColor';
      const color = getColor(value, scheme, namespace);
      const color2 = getColorNamespace(namespace).getScale(scheme).getColor(value);
      expect(color).toBe(color2);
    });
  });
});
