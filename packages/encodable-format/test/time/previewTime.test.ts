import createTimeFormatter from '../../src/time/createTimeFormatter';
import previewTime from '../../src/time/previewTime';

describe('.preview(value)', () => {
  const formatter = createTimeFormatter({
    id: 'year_only',
    formatFunc: value => `${value.getFullYear()}`,
  });
  it('returns string comparing value before and after formatting', () => {
    const time = new Date(Date.UTC(2018, 10, 21, 22, 11, 44));
    expect(previewTime(formatter, time)).toEqual('Wed, 21 Nov 2018 22:11:44 GMT => 2018');
  });
  it('uses the default preview value if not specified', () => {
    expect(previewTime(formatter)).toEqual('Tue, 14 Feb 2017 11:22:33 GMT => 2017');
  });
});
