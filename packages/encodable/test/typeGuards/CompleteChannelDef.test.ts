import { isCompleteValueDef, isCompleteFieldDef } from '../../src/typeGuards/CompleteChannelDef';
import { CompleteChannelDef } from '../../src/types/CompleteChannelDef';

describe('type guards: ChannelDef', () => {
  const valueDef: CompleteChannelDef = {
    value: 'red',
    title: '',
    axis: false,
    legend: false,
    scale: false,
  };
  const fieldDef: CompleteChannelDef = {
    type: 'quantitative',
    field: 'horsepower',
    title: 'horsepower',
    axis: false,
    legend: false,
    scale: false,
  };

  describe('isCompleteValueDef(def)', () => {
    it('returns true if is CompleteValueDef', () => {
      expect(isCompleteValueDef(valueDef)).toBeTruthy();
    });
    it('return false otherwise', () => {
      expect(isCompleteValueDef(fieldDef)).toBeFalsy();
    });
  });
  describe('isCompleteFieldDef(def)', () => {
    it('returns true if is CompleteFieldDef', () => {
      expect(isCompleteFieldDef(fieldDef)).toBeTruthy();
    });
    it('return false otherwise', () => {
      expect(isCompleteFieldDef(valueDef)).toBeFalsy();
    });
  });
});
