import createFormatterFromChannelDef from '../../../src/parsers/format/createFormatterFromChannelDef';

describe('createFormatterFromChannelDef(type, format)', () => {
  describe('creates formatter for FieldDef', () => {
    it('number', () => {
      const formatter = createFormatterFromChannelDef({
        field: 'price',
        formatType: 'number',
        format: '.2f',
      });
      expect(formatter(5324)).toEqual('5324.00');
    });
    it('time', () => {
      const formatter = createFormatterFromChannelDef({
        field: 'lunchTime',
        formatType: 'time',
        format: '%b %d, %Y',
      });
      expect(formatter(new Date(Date.UTC(2019, 5, 20)))).toEqual('Jun 20, 2019');
    });
    it('format with unspecified formatType', () => {
      const formatter = createFormatterFromChannelDef({
        field: 'price',
        format: '.2f',
      });
      expect(formatter(5324)).toEqual('5324.00');
    });
    it('no formatting', () => {
      const formatter = createFormatterFromChannelDef({
        field: 'price',
      });
      expect(formatter(5324)).toEqual('5324');
    });
  });
  it('handles when format is defined', () => {
    const formatter = createFormatterFromChannelDef({
      field: 'lunchTime',
      type: 'temporal',
      format: '%b %d, %Y',
    });
    expect(formatter(new Date(Date.UTC(2019, 5, 20)))).toEqual('Jun 20, 2019');
  });
  it('handles when format is not defined', () => {
    const formatter = createFormatterFromChannelDef({
      field: 'lunchTime',
      type: 'temporal',
    });
    expect(formatter(new Date(Date.UTC(2019, 5, 20)))).toEqual('2019-06-20 00:00:00');
  });
  it('uses fallback for other cases', () => {
    const formatter = createFormatterFromChannelDef({ type: 'nominal', field: 'restaurantName' });
    expect(formatter('Lazy Burger')).toEqual('Lazy Burger');
  });
  it('uses fallback for channel definitions without type', () => {
    const formatter = createFormatterFromChannelDef({ value: 'Lettuce' });
    expect(formatter('Lazy Burger')).toEqual('Lazy Burger');
  });
});
