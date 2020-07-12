import store from '../src';

describe('singleton-store', () => {
  it('exports store', () => {
    expect(store).toBeDefined();
  });
});
