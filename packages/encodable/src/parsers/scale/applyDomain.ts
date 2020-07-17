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
  /** domain from dataset */
  dataDomain?: ChannelInput[],
) {
  const { domain, reverse, type } = config;

  const order = createOrderFunction(reverse);

  if (
    (isContinuousScale(scale, type) && isContinuousScaleConfig(config)) ||
    (isDiscretizingScale(scale, type) && isDiscretizingScaleConfig(config))
  ) {
    let configDomain: (ContinuousInput | null | undefined)[] = config.domain?.concat() ?? [];

    // if `domain` is not set.
    // construct from domainMin and domainMax
    if (configDomain.length === 0) {
      const min = 'domainMin' in config ? config.domainMin : undefined;
      const max = 'domainMax' in config ? config.domainMax : undefined;

      if (min != null || max != null) {
        configDomain = [min, max];
      }
    }

    if (configDomain.length > 0) {
      const fixedDomain = configDomain.map(parseDateTimeIfPossible);
      const combined = combineContinuousDomains(
        parseContinuousDomain(fixedDomain, type),
        dataDomain && parseContinuousDomain(removeUndefinedAndNull(dataDomain), type),
      );
      if (combined) {
        scale.domain(order(combined));
      }
    } else if (dataDomain) {
      scale.domain(order(parseContinuousDomain(removeUndefinedAndNull(dataDomain), type)));
    }
  } else if (domain?.length) {
    const fixedDomain = inferElementTypeFromUnionOfArrayTypes(config.domain).map(
      parseDateTimeIfPossible,
    );
    scale.domain(
      order(
        combineCategories(
          parseDiscreteDomain(fixedDomain),
          dataDomain && parseDiscreteDomain(dataDomain),
        ),
      ),
    );
  } else if (dataDomain) {
    scale.domain(order(parseDiscreteDomain(dataDomain)));
  }
}
