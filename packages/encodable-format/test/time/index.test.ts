import {
  getTimeFormatterRegistry,
  getTimeFormatter,
  formatTime,
  TimeFormatterRegistry,
  LOCAL_TIME_PREFIX,
} from '../../src/time';
import { PREVIEW_TIME } from '../../src/time/previewTime';

describe('TimeFormatterRegistrySingleton', () => {
  describe('getTimeFormatterRegistry()', () => {
    it('returns a TimeFormatterRegisry', () => {
      expect(getTimeFormatterRegistry()).toBeInstanceOf(TimeFormatterRegistry);
    });
  });
  describe('getTimeFormatter(format)', () => {
    it('returns a format function', () => {
      const format = getTimeFormatter('%d/%m/%Y');
      expect(format(PREVIEW_TIME)).toEqual('14/02/2017');
    });
    it('falls back to default format if format is not specified', () => {
      const format = getTimeFormatter();
      expect(format(PREVIEW_TIME)).toEqual('2017-02-14 11:22:33');
    });
    it(`use local time when format string has LOCAL_PREFIX (${LOCAL_TIME_PREFIX})`, () => {
      const format = getTimeFormatter('local!%m-%d %H:%M');
      expect(format(new Date(2019, 5, 18, 11, 23))).toEqual('06-18 11:23');
    });
  });
  // describe('formatTimeRange(format?, values)', () => {
  //   it('format the given time range with specified format', () => {
  //     expect(
  //       formatTimeRange('%m-%d', [new Date(Date.UTC(2017, 1, 1)), new Date(Date.UTC(2017, 1, 2))]),
  //     ).toEqual('02-01 — 02-02');
  //   });
  //   it('show only one value if start and end are equal after formatting', () => {
  //     expect(
  //       formatTimeRange('%m-%d', [
  //         new Date(Date.UTC(2017, 1, 1)),
  //         new Date(Date.UTC(2017, 1, 1, 10)),
  //       ]),
  //     ).toEqual('02-01');
  //   });
  //   it('falls back to default format if format is not specified', () => {
  //     expect(
  //       formatTimeRange(undefined, [
  //         new Date(Date.UTC(2017, 1, 1)),
  //         new Date(Date.UTC(2017, 1, 2)),
  //       ]),
  //     ).toEqual('2017-02-01 00:00:00 — 2017-02-02 00:00:00');
  //   });
  // });
  describe('formatTime(format?, value, granularity?)', () => {
    it('format the given time using the specified format', () => {
      const output = formatTime('%Y-%m-%d', PREVIEW_TIME);
      expect(output).toEqual('2017-02-14');
    });
    it('falls back to the default formatter if the format is undefined', () => {
      expect(formatTime(undefined, PREVIEW_TIME)).toEqual('2017-02-14 11:22:33');
    });
  });
});
