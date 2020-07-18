import { Value, D3Scale, ScaleConfig } from '../../types';

export default function applyClamp<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('clamp' in config && config.clamp === true && 'clamp' in scale) {
    scale.clamp(config.clamp);
  }
}
