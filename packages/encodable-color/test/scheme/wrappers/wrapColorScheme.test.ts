import wrapColorScheme from '../../../src/scheme/wrappers/wrapColorScheme';

describe('wrapColorScheme()', () => {
  it('returns wrapper with getters', () => {
    const wrapper = wrapColorScheme({
      type: 'categorical',
      id: 'test',
      colors: ['red', 'green', 'blue'],
      label: 'awesome palette',
      description: 'something',
    });

    expect(wrapper.id).toEqual('test');
    expect(wrapper.type).toEqual('categorical');
    expect(wrapper.label).toEqual('awesome palette');
    expect(wrapper.description).toEqual('something');
  });
  describe('support all scheme types', () => {
    it('categorical', () => {
      expect(
        wrapColorScheme({ type: 'categorical', id: 'test', colors: ['red', 'green', 'blue'] }),
      ).toBeDefined();
    });
    it('sequential', () => {
      expect(
        wrapColorScheme({ type: 'sequential', id: 'test', colors: ['red', 'white'] }),
      ).toBeDefined();
    });
    it('diverging', () => {
      expect(
        wrapColorScheme({ type: 'diverging', id: 'test', colors: ['red', 'white', 'blue'] }),
      ).toBeDefined();
    });
    it('otherwise', () => {
      // @ts-ignore
      expect(() => wrapColorScheme({ type: 'haha' })).toThrow('Unknown scheme type: haha');
    });
  });
  describe('creates wrapper only when necessary', () => {
    it('categorical', () => {
      const wrapper = wrapColorScheme({
        type: 'categorical',
        id: 'test',
        colors: ['red', 'green', 'blue'],
      });
      expect(wrapColorScheme(wrapper)).toBe(wrapper);
    });
    it('sequential', () => {
      const wrapper = wrapColorScheme({ type: 'sequential', id: 'test', colors: ['red', 'white'] });
      expect(wrapColorScheme(wrapper)).toBe(wrapper);
    });
    it('diverging', () => {
      const wrapper = wrapColorScheme({
        type: 'diverging',
        id: 'test',
        colors: ['red', 'white', 'blue'],
      });
      expect(wrapColorScheme(wrapper)).toBe(wrapper);
    });
  });
});
