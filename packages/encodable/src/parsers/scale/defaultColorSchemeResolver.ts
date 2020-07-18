import { getSequentialSchemeRegistry } from '@superset-ui/color';
import { ColorSchemeResolver } from '../../types';

const defaultColorSchemeResolver: ColorSchemeResolver = ({ name, type }) => {
  if (type === 'sequential') {
    return getSequentialSchemeRegistry().get(name)?.colors;
  }
  return undefined;
};

export default defaultColorSchemeResolver;
