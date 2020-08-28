import { wrapColorScheme } from '@encodable/color';
import { DefaultOutput, D3Scale, ScaleConfig } from '../../types';
import Encodable from '../../options/Encodable';
import { isContinuousScaleConfig } from '../../typeGuards/ScaleConfig';
import { isSchemeParams } from '../../typeGuards/SchemeParams';

export default function applyRange<Output extends DefaultOutput>(
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

      const schemeObject = Encodable.resolveColorScheme({ name, type: 'sequential' });
      if (typeof schemeObject !== 'undefined' && schemeObject.type === 'sequential') {
        const wrappedScheme = wrapColorScheme(schemeObject);
        scale.range(wrappedScheme.getColors(count, extent) as Output[]);
      }
    }
  } else {
    // TODO: add type guard should fix this problem
    // @ts-ignore
    scale.range(range);
  }
}
