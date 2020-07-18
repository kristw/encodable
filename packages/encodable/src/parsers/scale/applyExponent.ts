import { Value, D3Scale, ScaleConfig } from '../../types';

export default function applyExponent<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('exponent' in config && typeof config.exponent !== 'undefined' && 'exponent' in scale) {
    scale.exponent(config.exponent);
  }
}
