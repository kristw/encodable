import { getColorSchemeRegistry, d3Schemes } from '@encodable/color';
import { defaultColorSchemeResolver } from '../../../src';

describe('defaultColorSchemeResolver', () => {
  it('returns scale for each type', () => {
    getColorSchemeRegistry().register(d3Schemes);
    expect(defaultColorSchemeResolver({ type: 'sequential' })).toBeDefined();
    expect(defaultColorSchemeResolver({ type: 'diverging' })).toBeDefined();
    expect(defaultColorSchemeResolver({ type: 'categorical' })).toBeDefined();
    getColorSchemeRegistry().clear();
  });
  it('handles default case', () => {
    getColorSchemeRegistry().register(d3Schemes);
    expect(defaultColorSchemeResolver({})).toBeDefined();
    expect(defaultColorSchemeResolver()).toBeDefined();
    getColorSchemeRegistry().clear();
  });
});
