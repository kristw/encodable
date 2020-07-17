import { isSchemeParams } from '../../src/typeGuards/SchemeParams';

describe('isSchemeParams(scheme)', () => {
  it('returns true if it is a SchemeParams object', () => {
    expect(isSchemeParams({ name: 'my-palette ' })).toBeTruthy();
  });
  it('returns false for string', () => {
    expect(isSchemeParams('my-palette')).toBeFalsy();
  });
});
