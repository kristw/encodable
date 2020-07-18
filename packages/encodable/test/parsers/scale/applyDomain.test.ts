import { scaleLinear, scaleOrdinal, scaleThreshold, scaleQuantile } from 'd3-scale';
import applyDomain from '../../../src/parsers/scale/applyDomain';
import { StringLike } from '../../../src/types';

describe('applyDomain()', () => {
  describe('with scale.domain', () => {
    describe('with domainFromDataset', () => {
      it('continuous scales', () => {
        const scale = scaleLinear();
        applyDomain({ type: 'linear', domain: [null, 10] }, scale, [1, 20]);
        expect(scale.domain()).toEqual([1, 10]);
      });
      describe('discretizing scales', () => {
        it('threshold', () => {
          const scale = scaleThreshold<string | number | Date, number>();
          applyDomain({ type: 'threshold', domain: [0, 1, 10] }, scale, [1, 20]);
          expect(scale.domain()).toEqual([0, 1, 10]);
        });
        it('quantile', () => {
          const scale = scaleQuantile<number>();
          applyDomain({ type: 'quantile', domain: [1, 1, 2, 3] }, scale, [1, 20]);
          expect(scale.domain()).toEqual([1, 1, 2, 3]);
        });
      });
      it('discrete scales', () => {
        const scale = scaleOrdinal<StringLike, string>();
        applyDomain(
          { type: 'ordinal', domain: ['a', 'c'], range: ['red', 'green', 'blue'] },
          scale,
          ['a', 'b', 'c'],
        );
        expect(scale.domain()).toEqual(['a', 'c', 'b']);
      });
      it('continuous scales (reverse)', () => {
        const scale = scaleLinear();
        applyDomain({ type: 'linear', domain: [null, 10], reverse: true }, scale, [1, 20]);
        expect(scale.domain()).toEqual([10, 1]);
      });
      it('discrete scales (reverse)', () => {
        const scale = scaleOrdinal<StringLike, string>();
        applyDomain(
          { type: 'ordinal', domain: ['a', 'c'], range: ['red', 'green', 'blue'], reverse: true },
          scale,
          ['a', 'b', 'c'],
        );
        expect(scale.domain()).toEqual(['b', 'c', 'a']);
      });
    });
    describe('without domainFromDataset', () => {
      it('continuous scales', () => {
        const scale = scaleLinear();
        applyDomain({ type: 'linear', domain: [1, 10] }, scale);
        expect(scale.domain()).toEqual([1, 10]);
      });
      describe('discretizing scales', () => {
        it('threshold', () => {
          const scale = scaleThreshold<string | number | Date, number>();
          applyDomain({ type: 'threshold', domain: [0, 1, 10] }, scale);
          expect(scale.domain()).toEqual([0, 1, 10]);
        });
        it('quantile', () => {
          const scale = scaleQuantile<number>();
          applyDomain({ type: 'quantile', domain: [1, 1, 2, 3] }, scale);
          expect(scale.domain()).toEqual([1, 1, 2, 3]);
        });
      });
      it('discrete scales', () => {
        const scale = scaleOrdinal<StringLike, string>();
        applyDomain(
          { type: 'ordinal', domain: ['a', 'c'], range: ['red', 'green', 'blue'] },
          scale,
        );
        expect(scale.domain()).toEqual(['a', 'c']);
      });
    });
  });
  describe('with domainFromDataset only', () => {
    it('continuous scales', () => {
      const scale = scaleLinear();
      applyDomain({ type: 'linear' }, scale, [1, 20]);
      expect(scale.domain()).toEqual([1, 20]);
    });
    describe('discretizing scales', () => {
      it('threshold', () => {
        const scale = scaleThreshold<string | number | Date, number>();
        applyDomain({ type: 'threshold' }, scale, [1, 20]);
        expect(scale.domain()).toEqual([1, 20]);
      });
      it('quantile', () => {
        const scale = scaleQuantile<number>();
        applyDomain({ type: 'quantile' }, scale, [1, 1, 2, 3, 5, 6]);
        expect(scale.domain()).toEqual([1, 1, 2, 3, 5, 6]);
      });
    });
    it('discrete scales', () => {
      const scale = scaleOrdinal<StringLike, string>();
      applyDomain({ type: 'ordinal', range: ['red', 'green', 'blue'] }, scale, ['a', 'b', 'c']);
      expect(scale.domain()).toEqual(['a', 'b', 'c']);
    });
  });
  it('uses default domain if none is specified', () => {
    const scale = scaleLinear();
    applyDomain({ type: 'linear' }, scale);
    expect(scale.domain()).toEqual([0, 1]);
  });
});
