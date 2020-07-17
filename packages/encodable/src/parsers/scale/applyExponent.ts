import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import { ScaleConfig } from '../../types/ScaleConfig';

export default function applyExponent<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('exponent' in config && typeof config.exponent !== 'undefined' && 'exponent' in scale) {
    scale.exponent(config.exponent);
  }
}
