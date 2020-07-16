import { scaleLinear } from 'd3-scale';
import applyRange from '../../../src/parsers/scale/applyRange';
import { OptionsManager } from '../../../src';

describe('applyRange()', () => {
  it('sets range', () => {
    const scale = scaleLinear();
    applyRange({ type: 'linear', range: [10, 20] }, scale);
    expect(scale.range()).toEqual([10, 20]);
  });
  describe('undefined range', () => {
    describe('with scheme', () => {
      beforeEach(() => {
        OptionsManager.setColorSchemeResolver(({ name }) =>
          typeof name === 'undefined' || name === 'test-scheme'
            ? ['#fee087', '#fa5c2e', '#800026']
            : undefined,
        );
      });
      afterEach(() => {
        OptionsManager.setColorSchemeResolver(undefined);
      });

      it('interpolates range to match items in domain', () => {
        const scale = scaleLinear();
        applyRange({ type: 'linear', scheme: 'test-scheme', domain: [1, 2] }, scale);
        expect(scale.range()).toEqual(['rgb(254, 224, 135)', 'rgb(128, 0, 38)']);

        const scale2 = scaleLinear();
        applyRange({ type: 'linear', scheme: 'test-scheme', domain: [0, 5, 10] }, scale2);
        expect(scale2.range()).toEqual(['#fee087', '#fa5c2e', '#800026']);
      });
      it('for scheme that does not exist, do not modify range', () => {
        const scale = scaleLinear();
        applyRange({ type: 'linear', scheme: 'something' }, scale);
        expect(scale.range()).toEqual([0, 1]);
      });

      describe('when scheme is object', () => {
        it('handle undefined name correctly', () => {
          const scale = scaleLinear();
          applyRange({ type: 'linear', scheme: {} }, scale);
          expect(scale.range()).toEqual(['#fee087', '#fa5c2e', '#800026']);
        });
        it('passes name correctly', () => {
          const scale = scaleLinear();
          applyRange({ type: 'linear', scheme: { name: 'test-scheme' } }, scale);
          expect(scale.range()).toEqual(['#fee087', '#fa5c2e', '#800026']);
        });
        it('passes count correctly', () => {
          const scale = scaleLinear();
          applyRange({ type: 'linear', scheme: { name: 'test-scheme', count: 4 } }, scale);
          expect(scale.range()).toEqual([
            'rgb(254, 224, 135)',
            'rgb(251, 144, 60)',
            'rgb(211, 60, 48)',
            'rgb(128, 0, 38)',
          ]);
        });
      });
    });
    describe('without scheme', () => {
      it('uses default range range', () => {
        const scale = scaleLinear();
        applyRange({ type: 'linear' }, scale);
        expect(scale.range()).toEqual([0, 1]);
      });
    });
  });
});
