import { interpolateBlues } from 'd3-scale-chromatic';
import SequentialSchemeWrapper from '../../../src/scheme/wrappers/SequentialSchemeWrapper';

describe('SequentialSchemeWrapper', () => {
  const wrapper = new SequentialSchemeWrapper({
    type: 'sequential',
    id: 'test',
    colors: ['#fff', '#f00'],
    label: 'white to red',
    description: 'white to red',
  });
  const wrapper2 = new SequentialSchemeWrapper({
    type: 'sequential',
    id: 'test',
    interpolator: interpolateBlues,
    label: 'white to red',
    description: 'white to red',
  });

  describe('.colors', () => {
    it('returns colors from given color array', () => {
      expect(wrapper.colors).toEqual(['#fff', '#f00']);
    });
    it('returns colors from interpolator', () => {
      expect(wrapper2.colors).toEqual(['rgb(247, 251, 255)', 'rgb(8, 48, 107)']);
    });
  });

  describe('.interpolator', () => {
    it('returns original interpolator', () => {
      expect(wrapper2.interpolator).toEqual(interpolateBlues);
    });
    it('returns interpolator from given color array', () => {
      expect(wrapper.interpolator(0)).toEqual('rgb(255, 255, 255)');
    });
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
