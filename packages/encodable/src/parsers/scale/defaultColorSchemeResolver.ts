import { getColorSchemeRegistry } from '@encodable/color';
import { ColorSchemeResolver } from '../../types';

const defaultColorSchemeResolver: ColorSchemeResolver = ({ name, type = 'categorical' }) =>
  getColorSchemeRegistry()[type].get(name);

export default defaultColorSchemeResolver;
