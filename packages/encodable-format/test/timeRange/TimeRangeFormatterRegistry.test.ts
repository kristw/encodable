import TimeRangeFormatterRegistry from '../../src/timeRange/TimeRangeFormatterRegistry';
import TimeFormats from '../../src/time/TimeFormats';
import { PREVIEW_TIME } from '../../src/time/previewTime';

describe('TimeRangeFormatterRegistry', () => {
  let registry: TimeRangeFormatterRegistry;
  beforeEach(() => {
    registry = new TimeRangeFormatterRegistry();
  });
  describe('.get(format)', () => {
    it('creates and returns a new formatter if does not exist', () => {
      const formatter = registry.get(TimeFormats.DATABASE_DATETIME);
      expect(formatter([PREVIEW_TIME, PREVIEW_TIME])).toEqual('2017-02-14 11:22:33');
    });
    it('returns an existing formatter if already exists', () => {
      const formatter = registry.get(TimeFormats.TIME);
      const formatter2 = registry.get(TimeFormats.TIME);
      expect(formatter).toBe(formatter2);
    });
  });
  describe('.format(format, value)', () => {
    it('return the value with the specified format', () => {
      expect(registry.format(TimeFormats.US_DATE, [PREVIEW_TIME, PREVIEW_TIME])).toEqual(
        '02/14/2017',
      );
      expect(registry.format(TimeFormats.TIME, [PREVIEW_TIME, PREVIEW_TIME])).toEqual('11:22:33');
    });
    it('falls back to the default formatter if the format is undefined', () => {
      expect(registry.format(undefined, [PREVIEW_TIME, PREVIEW_TIME])).toEqual(
        '2017-02-14 11:22:33',
      );
    });
  });
});
