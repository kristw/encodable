import { scaleOrdinal } from 'd3-scale';
import { getColorNamespace } from '../../src/scale';
import { getColorSchemeRegistry } from '../../src';
import ColorNamespace from '../../src/scale/ColorNamespace';

describe('ColorNamespace', () => {
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
  describe('constructor', () => {
    it('accepts string', () => {
      const namespace = new ColorNamespace('hello');
      expect(namespace).toBeDefined();
      expect(namespace.name).toEqual('hello');
    });
    it('accepts state', () => {
      const namespace = new ColorNamespace({
        name: 'hello',
        manualColors: {},
        scales: {},
      });
      expect(namespace).toBeDefined();
      expect(namespace.name).toEqual('hello');
    });
  });

  describe('.name', () => {
    it('returns name', () => {
      const namespace = getColorNamespace('great-name');
      expect(namespace.name).toEqual('great-name');
    });
  });
  describe('.hasScale(scheme)', () => {
    it('returns true if exists', () => {
      const namespace = getColorNamespace('test-has-scale1');
      namespace.getScale('testColors');
      expect(namespace.hasScale('testColors')).toBeTruthy();
    });
    it('returns false if not', () => {
      const namespace = getColorNamespace('test-has-scale2');
      expect(namespace.hasScale('testColors')).toBeFalsy();
    });
  });
  describe('.getScale(scheme)', () => {
    it('returns a scale from given scheme name', () => {
      const namespace = getColorNamespace('test-get-scale1');
      const scale = namespace.getScale('testColors');
      expect(scale).toBeDefined();
      expect(scale.getColor('dog')).toBeDefined();
    });
    it('returns a scale when a schemeId is not specified and there is no default key', () => {
      getColorSchemeRegistry().categorical.clearDefaultKey();
      const namespace = getColorNamespace('new-space');
      const scale = namespace.getScale();
      expect(scale).toBeDefined();
      getColorSchemeRegistry().categorical.setDefaultKey('testColors');
    });
    it('returns same scale if the scale with that name already exists in this namespace', () => {
      const namespace = getColorNamespace('test-get-scale2');
      const scale1 = namespace.getScale('testColors');
      const scale2 = namespace.getScale('testColors2');
      const scale3 = namespace.getScale('testColors2');
      const scale4 = namespace.getScale('testColors');
      expect(scale1).toBe(scale4);
      expect(scale2).toBe(scale3);
    });
    it('uses the existing base scale in state if exists', () => {
      const namespace = new ColorNamespace({
        name: 'hello',
        manualColors: {},
        scales: {
          test: {
            manualColors: {},
            scale: scaleOrdinal(['red', 'yellow']),
          },
        },
      });
      const scale = namespace.getScale('test');
      expect(scale('goat')).toEqual('red');
    });
  });
  describe('.setColor(value, color)', () => {
    it('overwrites color for all scales in this namespace', () => {
      const namespace = getColorNamespace('test-set-scale1');
      namespace.setColor('dog', 'black');
      const scale = namespace.getScale('testColors');
      expect(scale.getColor('dog')).toBe('black');
      expect(scale.getColor('boy')).not.toBe('black');
    });
    it('can override forcedColors in each scale', () => {
      const namespace = getColorNamespace('test-set-scale2');
      namespace.setColor('dog', 'black');
      const scale = namespace.getScale('testColors');
      scale.setColor('dog', 'pink');
      expect(scale.getColor('dog')).toBe('black');
      expect(scale.getColor('boy')).not.toBe('black');
    });
    it('does not affect scales in other namespaces', () => {
      const ns1 = getColorNamespace('test-set-scale3.1');
      ns1.setColor('dog', 'black');
      const scale1 = ns1.getScale('testColors');
      const ns2 = getColorNamespace('test-set-scale3.2');
      const scale2 = ns2.getScale('testColors');
      expect(scale1.getColor('dog')).toBe('black');
      expect(scale2.getColor('dog')).not.toBe('black');
    });
    it('returns the namespace instance', () => {
      const ns1 = getColorNamespace('test-set-scale3.1');
      const ns2 = ns1.setColor('dog', 'black');
      expect(ns1).toBe(ns2);
    });
  });
  describe('.unsetColor(value)', () => {
    it('unset color for the value', () => {
      const ns1 = getColorNamespace('test-unset');
      ns1.setColor('dog', 'black');
      ns1.setColor('cat', 'green');
      expect(ns1.hasManualColor('dog')).toBeTruthy();
      expect(ns1.hasManualColor('cat')).toBeTruthy();
      ns1.unsetColor('dog');
      expect(ns1.hasManualColor('dog')).toBeFalsy();
      expect(ns1.hasManualColor('cat')).toBeTruthy();
    });
  });
  describe('.hasManualColor(value)', () => {
    it('returns true if a color was manually specified for this value', () => {
      const ns1 = getColorNamespace('test-has-color1');
      ns1.setColor('dog', 'black');
      expect(ns1.hasManualColor('dog')).toBeTruthy();
    });
    it('returns false otherwise', () => {
      const ns1 = getColorNamespace('test-has-color2');
      expect(ns1.hasManualColor('dog')).toBeFalsy();
    });
  });
  describe('.clearManualValues()', () => {
    it('clears specified values', () => {
      const ns1 = getColorNamespace('test-clear');
      ns1.setColor('dog', 'black');
      ns1.setColor('cat', 'black');
      expect(ns1.hasManualColor('dog')).toBeTruthy();
      expect(ns1.hasManualColor('cat')).toBeTruthy();
      ns1.clearManualColors();
      expect(ns1.hasManualColor('dog')).toBeFalsy();
      expect(ns1.hasManualColor('cat')).toBeFalsy();
    });
  });
});
