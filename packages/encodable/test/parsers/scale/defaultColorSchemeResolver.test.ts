import defaultColorSchemeResolver from '../../../src/parsers/scale/defaultColorSchemeResolver';

describe('defaultColorSchemeResolver', () => {
  it('only handles sequential scale', () => {
    expect(defaultColorSchemeResolver({ type: 'sequential' })).toBeDefined();
    expect(defaultColorSchemeResolver({ type: 'diverging' })).toBeUndefined();
    expect(defaultColorSchemeResolver({ type: 'categorical' })).toBeUndefined();
  });
});
