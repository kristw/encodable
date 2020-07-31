import addSign from '../../src/utils/addSign';

describe('addSign()', () => {
  it('adds sign in front', () => {
    expect(addSign('.2f')).toEqual('+.2f');
  });
  it('does not add if already exists', () => {
    expect(addSign('+.2f')).toEqual('+.2f');
  });
});
