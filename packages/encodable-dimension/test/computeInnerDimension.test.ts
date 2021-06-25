import { computeInnerDimension } from '../src';

describe('computeInnerDimension(width, height, padding)', () => {
  it('returns inner dimension', () => {
    expect(computeInnerDimension(100, 100, { top: 1, bottom: 1, right: 1, left: 1 })).toEqual({
      width: 98,
      height: 98,
    });
  });
});
