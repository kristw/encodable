import { ColorScheme, CategoricalScheme, SequentialScheme, DivergingScheme } from '../../types';
import CategoricalSchemeWrapper from './CategoricalSchemeWrapper';
import SequentialSchemeWrapper from './SequentialSchemeWrapper';
import DivergingSchemeWrapper from './DivergingSchemeWrapper';

export type ColorSchemeWrapper =
  | CategoricalSchemeWrapper
  | SequentialSchemeWrapper
  | DivergingSchemeWrapper;

function createWrapper(scheme: CategoricalScheme): CategoricalSchemeWrapper;
function createWrapper(scheme: SequentialScheme): SequentialSchemeWrapper;
function createWrapper(scheme: DivergingScheme): DivergingSchemeWrapper;
function createWrapper(scheme: ColorScheme): ColorSchemeWrapper;

function createWrapper<T extends ColorScheme>(scheme: T) {
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

export default createWrapper;
