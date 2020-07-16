import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import { ScaleConfig } from '../../types/ScaleConfig';

export default function applyClamp<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('clamp' in config && config.clamp === true && 'clamp' in scale) {
    scale.clamp(config.clamp);
  }
}
