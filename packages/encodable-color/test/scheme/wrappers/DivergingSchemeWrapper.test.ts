import DivergingSchemeWrapper from '../../../src/scheme/wrappers/DivergingSchemeWrapper';

describe('DivergingSchemeWrapper', () => {
  const wrapper = new DivergingSchemeWrapper({
    type: 'diverging',
    id: 'test',
    colors: ['#00f', '#fff', '#f00'],
    label: 'blue/white/red',
    description: 'blue to white to red',
  });

  describe('.getColors()', () => {
    it('returns colors', () => {
      expect(wrapper.getColors()).toEqual(['#00f', '#fff', '#f00']);
      expect(wrapper.getColors(3)).toEqual(['#00f', '#fff', '#f00']);
      expect(wrapper.getColors(5)).toEqual([
        'rgb(0, 0, 255)',
        'rgb(128, 128, 255)',
        'rgb(255, 255, 255)',
        'rgb(255, 128, 128)',
        'rgb(255, 0, 0)',
      ]);
    });
  });
  describe('.createScaleLinear()', () => {
    it('returns scale', () => {
      const scale = wrapper.createScaleLinear();
      expect(scale(0)).toEqual('rgb(0, 0, 255)');
      expect(scale(0.5)).toEqual('rgb(255, 255, 255)');
      expect(scale(1)).toEqual('rgb(255, 0, 0)');
    });
  });
});
