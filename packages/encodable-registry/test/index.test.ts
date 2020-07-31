import { Registry, SynchronousRegistry } from '../src';

describe('index', () => {
  it('exports modules', () => {
    [Registry, SynchronousRegistry].forEach(x => expect(x).toBeDefined());
  });
});
