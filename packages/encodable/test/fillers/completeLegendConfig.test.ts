import completeLegendConfig from '../../src/fillers/completeLegendConfig';

describe('completeLegendConfig()', () => {
  it('returns input legend config if legend is defined', () => {
    expect(
      completeLegendConfig('Color', {
        type: 'nominal',
        field: 'brand',
        legend: { a: 1 },
      }),
    ).toEqual({ a: 1 });
  });
  describe('if legend is undefined', () => {
    it('returns false if channel is X or Y', () => {
      expect(
        completeLegendConfig('X', {
          type: 'quantitative',
          field: 'consumption',
        }),
      ).toEqual(false);
      expect(
        completeLegendConfig('Y', {
          type: 'quantitative',
          field: 'consumption',
        }),
      ).toEqual(false);
    });
    it('returns false if channel is Text', () => {
      expect(
        completeLegendConfig('Text', {
          type: 'nominal',
          field: 'name',
        }),
      ).toEqual(false);
    });
    it('returns default legend config for remaining channel types', () => {
      expect(
        completeLegendConfig('Color', {
          type: 'nominal',
          field: 'brand',
        }),
      ).toEqual({});
    });
  });
  it('returns false if legend is false', () => {
    expect(
      completeLegendConfig('Color', {
        type: 'nominal',
        field: 'brand',
        legend: false,
      }),
    ).toEqual(false);
  });
});
