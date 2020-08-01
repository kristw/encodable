import { getNumberFormatterRegistry, getTimeFormatterRegistry } from '../src';

describe('@encodable/format', () => {
  it('exports', () => {
    expect(getNumberFormatterRegistry).toBeDefined();
    expect(getTimeFormatterRegistry).toBeDefined();
  });
});
