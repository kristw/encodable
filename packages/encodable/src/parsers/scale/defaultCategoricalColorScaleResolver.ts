import { CategoricalColorNamespace } from '@superset-ui/color';
import { CategoricalColorScaleResolver } from '../../types/Options';

const defaultCategoricalColorScaleResolver: CategoricalColorScaleResolver = ({
  name,
  namespace,
}) => {
  return CategoricalColorNamespace.getScale(name, namespace);
};

export default defaultCategoricalColorScaleResolver;
