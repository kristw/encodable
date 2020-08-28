import { DefaultOutput, D3Scale, ScaleConfig } from '../../types';

export default function applyAlign<Output extends DefaultOutput>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('align' in config && typeof config.align !== 'undefined' && 'align' in scale) {
    scale.align(config.align);
  }
}
