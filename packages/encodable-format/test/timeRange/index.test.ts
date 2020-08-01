import { formatTimeRange } from '../../src';

describe('formatTimeRange(format?, values)', () => {
  it('format the given time range with specified format', () => {
    expect(
      formatTimeRange('%m-%d', [new Date(Date.UTC(2017, 1, 1)), new Date(Date.UTC(2017, 1, 2))]),
    ).toEqual('02-01 — 02-02');
  });
  it('show only one value if start and end are equal after formatting', () => {
    expect(
      formatTimeRange('%m-%d', [
        new Date(Date.UTC(2017, 1, 1)),
        new Date(Date.UTC(2017, 1, 1, 10)),
      ]),
    ).toEqual('02-01');
  });
  it('falls back to default format if format is not specified', () => {
    expect(
      formatTimeRange(undefined, [new Date(Date.UTC(2017, 1, 1)), new Date(Date.UTC(2017, 1, 2))]),
    ).toEqual('2017-02-01 00:00:00 — 2017-02-02 00:00:00');
  });
});
