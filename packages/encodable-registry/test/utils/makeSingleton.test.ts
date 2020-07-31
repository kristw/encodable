import { makeSingleton } from '../../src';

const factory = () => ({ hello: 'world' });

describe('makeSingleton(factory)', () => {
  const getInstance = makeSingleton(factory);

  it('returns a function for getting singleton instance of a given factory function', () => {
    expect(typeof getInstance).toBe('function');
    expect(getInstance()).toEqual({ hello: 'world' });
  });
  it('returned function returns same instance across all calls', () => {
    expect(getInstance()).toBe(getInstance());
  });
});
