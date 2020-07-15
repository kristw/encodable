import completeFormatConfig from '../../src/fillers/completeFormatConfig';

describe('completeFormatConfig()', () => {
  describe('when formatType is defined', () => {
    it('passes the same thing if already defined', () => {
      expect(
        completeFormatConfig({
          formatType: 'number',
          format: '.2s',
        }),
      ).toEqual({
        formatType: 'number',
        format: '.2s',
      });
      expect(
        completeFormatConfig({
          formatType: 'time',
        }),
      ).toEqual({
        formatType: 'time',
        format: undefined,
        formatInLocalTime: false,
      });
      expect(
        completeFormatConfig({
          formatType: 'time',
          formatInLocalTime: true,
        }),
      ).toEqual({
        formatType: 'time',
        format: undefined,
        formatInLocalTime: true,
      });
    });
    it('prioritizes formatType over (field) type', () => {
      expect(
        completeFormatConfig({
          formatType: 'number',
          type: 'temporal',
          format: '.2s',
        }),
      ).toEqual({
        formatType: 'number',
        format: '.2s',
      });
    });
  });
  describe('when formatType is not defined', () => {
    it('uses number formatter for quantitative field', () => {
      expect(
        completeFormatConfig({
          type: 'quantitative',
        }),
      ).toEqual({
        formatType: 'number',
      });
    });
    it('uses time formatter for temporal field', () => {
      expect(
        completeFormatConfig({
          type: 'temporal',
        }),
      ).toEqual({
        formatType: 'time',
        formatInLocalTime: false,
      });
    });
    it('prioritizes (field) type over scaleType', () => {
      expect(
        completeFormatConfig({
          type: 'quantitative',
          scaleType: 'utc',
        }),
      ).toEqual({
        formatType: 'number',
      });
    });
    it('infers time scale from scaleType', () => {
      expect(
        completeFormatConfig({
          scaleType: 'time',
        }),
      ).toEqual({
        formatType: 'time',
        formatInLocalTime: true,
        format: undefined,
      });
    });
    it('infers UTC time scale from scaleType', () => {
      expect(
        completeFormatConfig({
          scaleType: 'utc',
        }),
      ).toEqual({
        formatType: 'time',
        formatInLocalTime: false,
        format: undefined,
      });
    });
    it('uses number formatter if only format is given', () => {
      expect(
        completeFormatConfig({
          format: '.2s',
        }),
      ).toEqual({
        formatType: 'number',
        format: '.2s',
      });
    });
    it('otherwise, returns as is', () => {
      expect(completeFormatConfig({})).toEqual({
        formatType: undefined,
        format: undefined,
      });
    });
  });
  it('prioritizes incoming formatInLocalTime over inference from scaleType', () => {
    expect(
      completeFormatConfig({
        scaleType: 'time',
        formatInLocalTime: false,
      }),
    ).toEqual({
      formatType: 'time',
      formatInLocalTime: false,
      format: undefined,
    });
  });
});
