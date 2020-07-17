import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import { ContinuousInput, ScaleConfig } from '../../types/ScaleConfig';
import inferElementTypeFromUnionOfArrayTypes from '../../utils/inferElementTypeFromUnionOfArrayTypes';
import { isContinuousScale, isDiscretizingScale } from '../../typeGuards/Scale';
import combineCategories from '../../utils/combineCategories';
import parseDateTimeIfPossible from '../parseDateTimeIfPossible';
import parseContinuousDomain from '../domain/parseContinuousDomain';
import parseDiscreteDomain from '../domain/parseDiscreteDomain';
import combineContinuousDomains from '../../utils/combineContinuousDomains';
import { ChannelInput } from '../../types/Channel';
import removeUndefinedAndNull from '../../utils/removeUndefinedAndNull';
import { isContinuousScaleConfig, isDiscretizingScaleConfig } from '../../typeGuards/ScaleConfig';

function createOrderFunction(reverse: boolean | undefined) {
  return reverse ? <T>(array: T[]) => array.concat().reverse() : <T>(array: T[]) => array;
}

export default function applyDomain<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
  domainFromDataset?: ChannelInput[],
) {
  const { domain, reverse, type } = config;

  const order = createOrderFunction(reverse);

  if (
    (isContinuousScale(scale, type) && isContinuousScaleConfig(config)) ||
    (isDiscretizingScale(scale, type) && isDiscretizingScaleConfig(config))
  ) {
    let userSpecifiedDomain: (ContinuousInput | null | undefined)[] = config.domain?.concat() ?? [];

    // if `domain` is not set.
    // construct from domainMin and domainMax
    if (userSpecifiedDomain.length === 0) {
      const min = 'domainMin' in config ? config.domainMin : undefined;
      const max = 'domainMax' in config ? config.domainMax : undefined;

      if (min != null || max != null) {
        userSpecifiedDomain = [min, max];
      }
    }

    if (userSpecifiedDomain.length > 0) {
      const fixedDomain = userSpecifiedDomain.map(parseDateTimeIfPossible);
      const combined = combineContinuousDomains(
        parseContinuousDomain(fixedDomain, type),
        domainFromDataset && parseContinuousDomain(removeUndefinedAndNull(domainFromDataset), type),
      );
      if (combined) {
        scale.domain(order(combined));
      }
    } else if (domainFromDataset) {
      scale.domain(order(parseContinuousDomain(removeUndefinedAndNull(domainFromDataset), type)));
    }
  } else if (domain?.length) {
    const fixedDomain = inferElementTypeFromUnionOfArrayTypes(config.domain).map(
      parseDateTimeIfPossible,
    );
    scale.domain(
      order(
        combineCategories(
          parseDiscreteDomain(fixedDomain),
          domainFromDataset && parseDiscreteDomain(domainFromDataset),
        ),
      ),
    );
  } else if (domainFromDataset) {
    scale.domain(order(parseDiscreteDomain(domainFromDataset)));
  }
}
