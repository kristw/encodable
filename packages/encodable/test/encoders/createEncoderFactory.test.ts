import createEncoderFactory from '../../src/encoders/createEncoderFactory';

describe('createEncoderFactory()', () => {
  const factory = createEncoderFactory<{
    x: ['X', number];
  }>({
    channelTypes: {
      x: 'X',
    },
    defaultEncoding: {
      x: { type: 'quantitative', field: 'speed' },
    },
  });

  it('supports defaultEncoding as fixed value', () => {
    const encoder = factory.create();
    expect(encoder.encoding).toEqual({
      x: { type: 'quantitative', field: 'speed' },
    });
  });
  it('supports completeEncoding for customization', () => {
    const factory2 = createEncoderFactory<{
      color: ['Color', string];
    }>({
      channelTypes: {
        color: 'Color',
      },
      completeEncoding: () => ({
        color: { value: 'red' },
      }),
    });

    const encoder = factory2.create();
    expect(encoder.encoding).toEqual({
      color: { value: 'red' },
    });
  });
  describe('factory.create()', () => {
    it('creates an encoder', () => {
      const encoder = factory.create();
      expect(encoder.encoding).toEqual({
        x: { type: 'quantitative', field: 'speed' },
      });
    });
  });
  describe('factory.createSelector()', () => {
    it('returns a selector', () => {
      const encoder = factory.createSelector()({});
      expect(encoder.encoding).toEqual({
        x: { type: 'quantitative', field: 'speed' },
      });
    });
  });
});
