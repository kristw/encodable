import previewNumber from '../../src/number/previewNumber';

describe('previewNumber(format, number)', () => {
  it('returns input and output as string', () => {
    expect(previewNumber((v: number | null | undefined) => `${v?.toFixed(2)}`, 200)).toEqual(
      '200 => 200.00',
    );
  });
  it('has default preview value', () => {
    expect(previewNumber((v: number | null | undefined) => `${v?.toFixed(2)}`)).toEqual(
      '12345.432 => 12345.43',
    );
  });
});
