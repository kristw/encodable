import { CategoricalColorNamespace } from '@superset-ui/color';
import { ScaleOrdinal } from 'd3-scale';
import { ScaleType, Value } from '../../types/VegaLite';
import { ScaleConfig, CategoricalScaleInput } from '../../types/Scale';
import createScaleFromScaleType from './createScaleFromScaleType';
import applyNice from './applyNice';
import applyZero from './applyZero';
import applyInterpolate from './applyInterpolate';
import applyRound from './applyRound';
import applyDomain from './applyDomain';
import applyRange from './applyRange';
import applyPadding from './applyPadding';
import applyAlign from './applyAlign';
import applyClamp from './applyClamp';

export default function createScaleFromScaleConfig<Output extends Value>(
  config: ScaleConfig<Output>,
) {
  const { range } = config;

  // Handle categorical color scales
  // An ordinal scale without specified range
  // is assumed to be a color scale.
  if (config.type === ScaleType.ORDINAL && typeof range === 'undefined') {
    const scheme = 'scheme' in config ? config.scheme : undefined;
    const namespace = 'namespace' in config ? config.namespace : undefined;
    const colorScale = CategoricalColorNamespace.getScale(scheme, namespace);

    applyDomain(config, (colorScale as unknown) as ScaleOrdinal<CategoricalScaleInput, Output>);

    return colorScale;
  }

  const scale = createScaleFromScaleType(config);
  // domain and range apply to all scales
  applyDomain(config, scale);
  applyRange(config, scale);
  // Sort other properties alphabetically.
  applyAlign(config, scale);
  applyClamp(config, scale);
  applyInterpolate(config, scale);
  applyNice(config, scale);
  applyPadding(config, scale);
  applyRound(config, scale);
  applyZero(config, scale);

  return scale;
}
