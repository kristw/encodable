import parseContinuousDomain from '../../../src/parsers/domain/parseContinuousDomain';

describe('parseContinuousDomain()', () => {
  it('parses time for time scale', () => {
    expect(
      parseContinuousDomain([0, 1, true, false, '2019-01-01', new Date(2019, 10, 1)], 'time'),
    ).toEqual([new Date(0), new Date(1), new Date('2019-01-01'), new Date(2019, 10, 1)]);
  });
  it('parses number or leave date as-is for other scale', () => {
    expect(
      parseContinuousDomain([0, 1, true, false, '2019-01-01', new Date(2019, 10, 1)], 'linear'),
    ).toEqual([0, 1, 1, 0, NaN, new Date(2019, 10, 1)]);
  });
});
