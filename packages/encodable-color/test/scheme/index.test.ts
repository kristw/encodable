import {
  getColorSchemeRegistry,
  getColorScheme,
  getCategoricalScheme,
  getSequentialScheme,
  getDivergingScheme,
} from '../../src';

describe('scheme', () => {
  getColorSchemeRegistry()
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

  it('getColorSchemeRegistry()', () => {
    expect(getColorSchemeRegistry()).toBeDefined();
  });
  it('getColorScheme()', () => {
    expect(getColorScheme('abc')).toBeDefined();
  });
  it('getCategoricalScheme()', () => {
    expect(getCategoricalScheme('abc')).toBeDefined();
    expect(getCategoricalScheme('def')).toBeUndefined();
  });
  it('getSequentialScheme()', () => {
    expect(getSequentialScheme('ghe')).toBeDefined();
    expect(getSequentialScheme('def')).toBeUndefined();
  });
  it('getDivergingScheme()', () => {
    expect(getDivergingScheme('def')).toBeDefined();
    expect(getDivergingScheme('abc')).toBeUndefined();
  });
});
