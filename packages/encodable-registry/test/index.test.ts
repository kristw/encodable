import { Registry, SyncRegistry } from '../src';

describe('index', () => {
  it('exports modules', () => {
    [Registry, SyncRegistry].forEach(x => expect(x).toBeDefined());
  });
});
