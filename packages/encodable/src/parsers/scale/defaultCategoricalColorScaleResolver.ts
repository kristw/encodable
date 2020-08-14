import { getScale } from '@encodable/color';
import { CategoricalColorScaleResolver } from '../../types/Options';

const defaultCategoricalColorScaleResolver: CategoricalColorScaleResolver = ({ name, namespace }) =>
  getScale(name, namespace);

export default defaultCategoricalColorScaleResolver;
