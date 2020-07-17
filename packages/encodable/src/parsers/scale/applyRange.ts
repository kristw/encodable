import { SequentialScheme } from '@superset-ui/color';
import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import OptionsManager from '../../options/OptionsManager';
import { ScaleConfig } from '../../types/ScaleConfig';
import { isContinuousScaleConfig } from '../../typeGuards/ScaleConfig';
import { isSchemeParams } from '../../typeGuards/SchemeParams';

export default function applyRange<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  const { range, domain } = config;
  if (typeof range === 'undefined') {
    if ('scheme' in config && typeof config.scheme !== 'undefined') {
      const { scheme } = config;
      let name: string | undefined;
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

      const colors = OptionsManager.getColorSchemeResolver()({ name, type: 'sequential' });
      if (typeof colors !== 'undefined') {
        const colorScheme = new SequentialScheme({ id: name ?? '', colors });
        scale.range(colorScheme.getColors(count, extent) as Output[]);
      }
    }
  } else {
    scale.range(range);
  }
}
