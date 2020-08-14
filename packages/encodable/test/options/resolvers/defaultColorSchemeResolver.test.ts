import { defaultColorSchemeResolver } from '../../../src';

describe('defaultColorSchemeResolver', () => {
  it('returns scale for each type', () => {
    expect(defaultColorSchemeResolver({ type: 'sequential' })).toBeDefined();
    expect(defaultColorSchemeResolver({ type: 'diverging' })).toBeDefined();
    expect(defaultColorSchemeResolver({ type: 'categorical' })).toBeDefined();
  });
  it('handles default case', () => {
    expect(defaultColorSchemeResolver({})).toBeDefined();
    expect(defaultColorSchemeResolver()).toBeDefined();
  });
});
