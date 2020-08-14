import { ColorScheme, CategoricalScheme, SequentialScheme, DivergingScheme } from '../../types';
import CategoricalSchemeWrapper from './CategoricalSchemeWrapper';
import SequentialSchemeWrapper from './SequentialSchemeWrapper';
import DivergingSchemeWrapper from './DivergingSchemeWrapper';

export default function createWrapper<T extends ColorScheme>(scheme: T) {
  switch (scheme.type) {
    case 'categorical':
      return new CategoricalSchemeWrapper(scheme as CategoricalScheme);
    case 'sequential':
      return new SequentialSchemeWrapper(scheme as SequentialScheme);
    case 'diverging':
      return new DivergingSchemeWrapper(scheme as DivergingScheme);
    default:
      throw new Error(`Unknown scheme type: ${scheme.type}`);
  }
}
