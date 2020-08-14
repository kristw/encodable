import { ColorScheme, CategoricalScheme, SequentialScheme, DivergingScheme } from '../../types';
import CategoricalSchemeWrapper from './CategoricalSchemeWrapper';
import SequentialSchemeWrapper from './SequentialSchemeWrapper';
import DivergingSchemeWrapper from './DivergingSchemeWrapper';

export type ColorSchemeWrapper =
  | CategoricalSchemeWrapper
  | SequentialSchemeWrapper
  | DivergingSchemeWrapper;

function wrapColorScheme(scheme: CategoricalScheme): CategoricalSchemeWrapper;
function wrapColorScheme(scheme: SequentialScheme): SequentialSchemeWrapper;
function wrapColorScheme(scheme: DivergingScheme): DivergingSchemeWrapper;
function wrapColorScheme(scheme: ColorScheme): ColorSchemeWrapper;

function wrapColorScheme<T extends ColorScheme>(scheme: T) {
  switch (scheme.type) {
    case 'categorical':
      return scheme instanceof CategoricalSchemeWrapper
        ? scheme
        : new CategoricalSchemeWrapper(scheme as CategoricalScheme);
    case 'sequential':
      return scheme instanceof SequentialSchemeWrapper
        ? scheme
        : new SequentialSchemeWrapper(scheme as SequentialScheme);
    case 'diverging':
      return scheme instanceof DivergingSchemeWrapper
        ? scheme
        : new DivergingSchemeWrapper(scheme as DivergingScheme);
    default:
      throw new Error(`Unknown scheme type: ${scheme.type}`);
  }
}

export default wrapColorScheme;
