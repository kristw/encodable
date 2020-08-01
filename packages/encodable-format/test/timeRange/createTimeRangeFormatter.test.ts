import createTimeRangeFormatter from '../../src/timeRange/createTimeRangeFormatter';
import { PREVIEW_TIME } from '../../src/time/previewTime';
import { TimeFormatInput } from '../../lib';

describe('createTimeRangeFormatter(config)', () => {
  describe('formatter is a format function itself', () => {
    const formatter = createTimeRangeFormatter(
      (values: TimeFormatInput[]) =>
        // eslint-disable-next-line no-negated-condition
        values.map(v => (v != null ? `${new Date(v).getFullYear()}` : '')).join(' - '),
      { id: 'test-format' },
    );
    it('returns formatted value', () => {
      expect(formatter([PREVIEW_TIME, PREVIEW_TIME])).toEqual('2017 - 2017');
    });
  });
  it('metadata is optional', () => {
    const formatter = createTimeRangeFormatter((values: TimeFormatInput[]) =>
      // eslint-disable-next-line no-negated-condition
      values.map(v => (v != null ? `${new Date(v).getFullYear()}` : '')).join(' - '),
    );
    expect(formatter([PREVIEW_TIME, PREVIEW_TIME])).toEqual('2017 - 2017');
  });
});
