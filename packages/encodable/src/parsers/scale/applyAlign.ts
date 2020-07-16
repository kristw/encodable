import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import { ScaleConfig } from '../../types/ScaleConfig';

export default function applyAlign<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('align' in config && typeof config.align !== 'undefined' && 'align' in scale) {
    scale.align(config.align);
  }
}
