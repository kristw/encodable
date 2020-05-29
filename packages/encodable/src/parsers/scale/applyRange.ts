import { getSequentialSchemeRegistry } from '@superset-ui/color';
import { Value } from '../../types/VegaLite';
import { ScaleConfig, D3Scale } from '../../types/Scale';
import { isContinuousScaleConfig, isSchemeParams } from '../../typeGuards/Scale';

export default function applyRange<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  const { range, domain } = config;
  if (typeof range === 'undefined') {
    if ('scheme' in config && typeof config.scheme !== 'undefined') {
      const { scheme } = config;
      let name: string;
      let count: number | undefined;

      if (isContinuousScaleConfig(config) && domain) {
        count = domain.length;
      }

      let extent: number[] | undefined;

      if (isSchemeParams(scheme)) {
        name = scheme.name;
        if (scheme.count) {
          count = scheme.count;
        }
        extent = scheme.extent;
      } else {
        name = scheme;
      }

      const colorScheme = getSequentialSchemeRegistry().get(name);
      if (typeof colorScheme !== 'undefined') {
        scale.range(colorScheme.getColors(count, extent) as Output[]);
      }
    }
  } else {
    scale.range(range);
  }
}
