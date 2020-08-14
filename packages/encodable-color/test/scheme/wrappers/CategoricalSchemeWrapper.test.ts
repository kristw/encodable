import CategoricalSchemeWrapper from '../../../src/scheme/wrappers/CategoricalSchemeWrapper';

describe('CategoricalSchemeWrapper', () => {
  const wrapper = new CategoricalSchemeWrapper({
    type: 'categorical',
    id: 'test',
    colors: ['red', 'green', 'blue'],
    label: 'awesome palette',
    description: 'something',
  });

  describe('.getColors()', () => {
    it('returns colors', () => {
      expect(wrapper.getColors()).toEqual(['red', 'green', 'blue']);
      expect(wrapper.getColors(2)).toEqual(['red', 'green']);
      expect(wrapper.getColors(5)).toEqual(['red', 'green', 'blue', 'red', 'green']);
      expect(wrapper.getColors(7)).toEqual(['red', 'green', 'blue', 'red', 'green', 'blue', 'red']);
    });
  });
  describe('.createScaleOrdinal()', () => {
    it('returns scale', () => {
      const scale = wrapper.createScaleOrdinal();
      expect(scale('dog')).toEqual('red');
    });
  });
});
