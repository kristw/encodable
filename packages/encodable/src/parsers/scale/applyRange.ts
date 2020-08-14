import SequentialSchemeWrapper from '@encodable/color/lib/scheme/wrappers/SequentialSchemeWrapper';
import { Value, D3Scale, ScaleConfig } from '../../types';
import OptionsManager from '../../options/OptionsManager';
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

      const schemeObject = OptionsManager.getColorSchemeResolver()({ name, type: 'sequential' });
      if (typeof schemeObject !== 'undefined' && schemeObject.type === 'sequential') {
        const wrappedScheme = new SequentialSchemeWrapper(schemeObject);
        scale.range(wrappedScheme.getColors(count, extent) as Output[]);
      }
    }
  } else {
    // TODO: add type guard should fix this problem
    // @ts-ignore
    scale.range(range);
  }
}
