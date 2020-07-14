import createFormatterFromFieldTypeAndFormat from '../../../src/parsers/format/createFormatterFromFieldTypeAndFormat';

describe('createFormatterFromFieldTypeAndFormat(type, format)', () => {
  it('create formatter based on formatType', () => {
    const formatter = createFormatterFromFieldTypeAndFormat({
      formatType: 'number',
      format: '.2f',
    });
    expect(formatter(200)).toEqual('200.00');
  });
  it('prioritize formatType over type', () => {
    const formatter = createFormatterFromFieldTypeAndFormat({
      formatType: 'number',
      type: 'temporal',
      format: '.2f',
    });
    expect(formatter(200)).toEqual('200.00');
  });
  it('uses number formatter for quantitative field type', () => {
    const formatter = createFormatterFromFieldTypeAndFormat({
      type: 'quantitative',
      format: '.2f',
    });
    expect(formatter(200)).toEqual('200.00');
  });
  it('uses time formatter for temporal field type', () => {
    const formatter = createFormatterFromFieldTypeAndFormat({
      type: 'temporal',
      format: '%b %d, %Y',
    });
    expect(formatter(new Date(Date.UTC(2019, 5, 20)))).toEqual('Jun 20, 2019');
  });
  it('uses number formatter if format is specified without format or formatType', () => {
    const formatter = createFormatterFromFieldTypeAndFormat({
      format: '.2f',
    });
    expect(formatter(200)).toEqual('200.00');
  });
  it('uses fallback for other cases', () => {
    const formatter = createFormatterFromFieldTypeAndFormat({
      type: 'nominal',
      format: '',
    });
    expect(formatter('cat')).toEqual('cat');
  });
});
