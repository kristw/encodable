import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import { ScaleConfig } from '../../types/ScaleConfig';

export default function applyBase<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('base' in config && typeof config.base !== 'undefined' && 'base' in scale) {
    scale.base(config.base);
  }
}
