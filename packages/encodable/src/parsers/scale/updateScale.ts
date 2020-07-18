import applyAlign from './applyAlign';
import applyBase from './applyBase';
import applyClamp from './applyClamp';
import applyExponent from './applyExponent';
import applyNice from './applyNice';
import applyZero from './applyZero';
import applyInterpolate from './applyInterpolate';
import applyRound from './applyRound';
import applyDomain from './applyDomain';
import applyRange from './applyRange';
import applyPadding from './applyPadding';
import { D3Scale, ScaleConfig, Value } from '../../types';

export default function updateScale<
  Output extends Value,
  Scale extends D3Scale<Output>,
  Config extends ScaleConfig<Output>
>(scale: Scale, config: Config) {
  // domain and range apply to all scales
  applyDomain(config, scale);
  applyRange(config, scale);
  // Sort other properties alphabetically.
  applyAlign(config, scale);
  applyBase(config, scale);
  applyClamp(config, scale);
  applyExponent(config, scale);
  applyInterpolate(config, scale);
  // Nice depends on domain.
  applyNice(config, scale);
  applyPadding(config, scale);
  applyRound(config, scale);
  // Zero depends on domain and nice.
  applyZero(config, scale);

  return scale;
}
