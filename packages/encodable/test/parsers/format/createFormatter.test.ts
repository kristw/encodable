import createFormatter from '../../../src/parsers/format/createFormatter';

describe('createFormatter(type, format)', () => {
  describe('create formatter based on formatType', () => {
    it('number', () => {
      const formatter = createFormatter({
        formatType: 'number',
        format: '.2f',
      });
      expect(formatter(200)).toEqual('200.00');
    });
    it('time', () => {
      const formatter = createFormatter({
        formatType: 'time',
        format: '%b %d, %Y',
      });
      expect(formatter(new Date(Date.UTC(2019, 5, 20)))).toEqual('Jun 20, 2019');
    });
  });
  it('uses number formatter if format is specified without formatType', () => {
    const formatter = createFormatter({
      format: '.2f',
    });
    expect(formatter(200)).toEqual('200.00');
  });
  it('uses fallback for other cases', () => {
    const formatter = createFormatter({
      format: '',
    });
    expect(formatter('cat')).toEqual('cat');
  });
});
