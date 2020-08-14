import createWrapper from '../../../src/scheme/wrappers/createWrapper';

describe('createWrapper()', () => {
  it('returns wrapper with getters', () => {
    const wrapper = createWrapper({
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
        createWrapper({ type: 'categorical', id: 'test', colors: ['red', 'green', 'blue'] }),
      ).toBeDefined();
    });
    it('sequential', () => {
      expect(
        createWrapper({ type: 'sequential', id: 'test', colors: ['red', 'white'] }),
      ).toBeDefined();
    });
    it('diverging', () => {
      expect(
        createWrapper({ type: 'diverging', id: 'test', colors: ['red', 'white', 'blue'] }),
      ).toBeDefined();
    });
    it('otherwise', () => {
      // @ts-ignore
      expect(() => createWrapper({ type: 'haha' })).toThrow('Unknown scheme type: haha');
    });
  });
  describe('creates wrapper only when necessary', () => {
    it('categorical', () => {
      const wrapper = createWrapper({
        type: 'categorical',
        id: 'test',
        colors: ['red', 'green', 'blue'],
      });
      expect(createWrapper(wrapper)).toBe(wrapper);
    });
    it('sequential', () => {
      const wrapper = createWrapper({ type: 'sequential', id: 'test', colors: ['red', 'white'] });
      expect(createWrapper(wrapper)).toBe(wrapper);
    });
    it('diverging', () => {
      const wrapper = createWrapper({
        type: 'diverging',
        id: 'test',
        colors: ['red', 'white', 'blue'],
      });
      expect(createWrapper(wrapper)).toBe(wrapper);
    });
  });
});
