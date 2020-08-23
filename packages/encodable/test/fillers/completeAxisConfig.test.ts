import completeAxisConfig from '../../src/fillers/completeAxisConfig';

const DEFAULT_INPUT = {
  type: 'quantitative',
  field: 'consumption',
  format: '.2f',
  formatType: 'number',
  scale: { type: 'linear' },
  title: 'King in the North',
} as const;

const DEFAULT_OUTPUT = {
  format: '.2f',
  formatType: 'number',
  labelAngle: 0,
  labelFlush: true,
  labelOverlap: {
    labelAngle: 40,
    strategy: 'rotate',
  },
  labelPadding: 4,
  orient: 'bottom',
  tickCount: 5,
  ticks: true,
  title: 'King in the North',
  titlePadding: 4,
};

describe('completeAxisConfig(channelDef)', () => {
  it('returns axis config with type', () => {
    expect(completeAxisConfig('X', DEFAULT_INPUT)).toEqual(DEFAULT_OUTPUT);
  });
  describe('default settings', () => {
    describe('format and title', () => {
      it('inherit from channel if not specified', () => {
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
            format: '.2f',
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          format: '.2f',
          title: 'King in the North',
        });
      });
      it('does not change if already specified', () => {
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
            format: '.2f',
            axis: { format: '.3f', title: 'Mother of Dragons' },
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          format: '.3f',
          title: 'Mother of Dragons',
        });
      });
    });
    describe('labelOverlap', () => {
      describe('expands strategy name to strategy object', () => {
        it('flat', () => {
          expect(
            completeAxisConfig('X', {
              ...DEFAULT_INPUT,
              axis: { labelOverlap: 'flat' },
            }),
          ).toEqual({
            ...DEFAULT_OUTPUT,
            labelOverlap: {
              strategy: 'flat',
            },
          });
        });
        it('rotate', () => {
          expect(
            completeAxisConfig('X', {
              ...DEFAULT_INPUT,
              axis: { labelOverlap: 'rotate' },
            }),
          ).toEqual({
            ...DEFAULT_OUTPUT,
            labelOverlap: {
              labelAngle: 40,
              strategy: 'rotate',
            },
          });
        });
        it('auto for X', () => {
          expect(
            completeAxisConfig('X', {
              ...DEFAULT_INPUT,
              axis: { labelOverlap: 'auto' },
            }),
          ).toEqual({
            ...DEFAULT_OUTPUT,
            labelOverlap: {
              labelAngle: 40,
              strategy: 'rotate',
            },
          });
        });
        it('auto for Y', () => {
          expect(
            completeAxisConfig('Y', {
              ...DEFAULT_INPUT,
              axis: { labelOverlap: 'auto' },
            }),
          ).toEqual({
            ...DEFAULT_OUTPUT,
            labelOverlap: {
              strategy: 'flat',
            },
            orient: 'left',
          });
        });
      });
      it('if given a strategy object, clone and return', () => {
        const strategy = { strategy: 'flat' as const };
        const output = completeAxisConfig('X', {
          ...DEFAULT_INPUT,
          axis: { labelOverlap: strategy },
        });
        expect(output).toEqual({
          ...DEFAULT_OUTPUT,
          labelOverlap: strategy,
        });
        // type guard
        if (output !== false) {
          expect(output.labelOverlap).not.toBe(strategy);
        }
      });
    });
    describe('orient', () => {
      it('uses default for X', () => {
        expect(completeAxisConfig('X', DEFAULT_INPUT)).toEqual(DEFAULT_OUTPUT);
      });
      it('uses default for Y', () => {
        expect(completeAxisConfig('YBand', DEFAULT_INPUT)).toEqual({
          ...DEFAULT_OUTPUT,
          labelOverlap: {
            strategy: 'flat',
          },
          orient: 'left',
        });
      });
      it('does not change if already specified', () => {
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
            axis: { orient: 'top' },
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          orient: 'top',
        });
      });
    });
    describe('labelFlush', () => {
      it('does not change if already specified', () => {
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
            axis: {
              labelFlush: false,
            },
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          labelFlush: false,
        });
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
            axis: {
              labelFlush: true,
            },
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          labelFlush: true,
        });
      });
      it('if not specified, set to true for continuous scales', () => {
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          labelFlush: true,
        });
      });
      it('if not specified, set to false for non-continuous scales', () => {
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
            scale: { type: 'band' },
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          labelFlush: false,
        });
      });
    });
    describe('others', () => {
      it('does not change if already specified', () => {
        expect(
          completeAxisConfig('X', {
            ...DEFAULT_INPUT,
            axis: {
              labelAngle: 30,
              labelFlush: false,
              labelPadding: 10,
              tickCount: 20,
              ticks: false,
              titlePadding: 10,
            },
          }),
        ).toEqual({
          ...DEFAULT_OUTPUT,
          labelAngle: 30,
          labelFlush: false,
          labelPadding: 10,
          tickCount: 20,
          ticks: false,
          titlePadding: 10,
        });
      });
    });
  });

  it('returns false if not XY channel', () => {
    expect(completeAxisConfig('Color', DEFAULT_INPUT)).toEqual(false);
  });
  it('returns false if axis is null', () => {
    expect(
      // @ts-ignore
      completeAxisConfig('X', { ...DEFAULT_INPUT, axis: null }),
    ).toEqual(false);
  });
  it('returns false if axis is false', () => {
    expect(
      completeAxisConfig('X', {
        ...DEFAULT_INPUT,
        axis: false,
      }),
    ).toEqual(false);
  });
});
