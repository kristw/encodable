import SequentialSchemeWrapper from '../../../src/scheme/wrappers/SequentialSchemeWrapper';

describe('SequentialSchemeWrapper', () => {
  const wrapper = new SequentialSchemeWrapper({
    type: 'sequential',
    id: 'test',
    colors: ['#fff', '#f00'],
    label: 'white to red',
    description: 'white to red',
  });

  describe('.getColors()', () => {
    it('returns colors', () => {
      expect(wrapper.getColors()).toEqual(['#fff', '#f00']);
      expect(wrapper.getColors(2)).toEqual(['#fff', '#f00']);
      expect(wrapper.getColors(5)).toEqual([
        'rgb(255, 255, 255)',
        'rgb(255, 191, 191)',
        'rgb(255, 128, 128)',
        'rgb(255, 64, 64)',
        'rgb(255, 0, 0)',
      ]);
    });
  });
  describe('.createScaleLinear()', () => {
    it('returns scale', () => {
      const scale = wrapper.createScaleLinear();
      expect(scale(0)).toEqual('rgb(255, 255, 255)');
      expect(scale(1)).toEqual('rgb(255, 0, 0)');
    });
  });
});
