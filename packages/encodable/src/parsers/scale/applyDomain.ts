import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import { ScaleConfig, Bounds } from '../../types/ScaleConfig';
import inferElementTypeFromUnionOfArrayTypes from '../../utils/inferElementTypeFromUnionOfArrayTypes';
import { isContinuousScale, isDiscretizingScale, isDiscreteScale } from '../../typeGuards/Scale';
import combineCategories from '../../utils/combineCategories';
import parseDateTimeIfPossible from '../parseDateTimeIfPossible';
import parseContinuousDomain from '../domain/parseContinuousDomain';
import parseDiscreteDomain from '../domain/parseDiscreteDomain';
import combineContinuousDomains from '../../utils/combineContinuousDomains';
import { ChannelInput } from '../../types/Channel';
import removeUndefinedAndNull from '../../utils/removeUndefinedAndNull';
import {
  isContinuousScaleConfig,
  isDiscretizingScaleConfig,
  isDiscreteScaleConfig,
} from '../../typeGuards/ScaleConfig';

function createOrderFunction(reverse: boolean | undefined) {
  return reverse ? <T>(array: T[]) => array.concat().reverse() : <T>(array: T[]) => array;
}

function isCompleteDomain<T>(domain: T[] | Bounds<T>): domain is T[] {
  return domain.length !== 2 || (domain[0] != null && domain[1] != null);
}

export default function applyDomain<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
  /** domain from dataset */
  dataDomain?: ChannelInput[],
) {
  const { reverse, type } = config;

  const order = createOrderFunction(reverse);

  if (
    (isContinuousScale(scale, type) && isContinuousScaleConfig(config)) ||
    (isDiscretizingScale(scale, type) && isDiscretizingScaleConfig(config))
  ) {
    // For continuous and discretizing scales
    if (config.domain) {
      // If config.domain is specified
      if (isCompleteDomain(config.domain)) {
        // If the config.domain is completed
        // ignores the dataDomain
        scale.domain(
          order(inferElementTypeFromUnionOfArrayTypes(config.domain).map(parseDateTimeIfPossible)),
        );
      } else if (dataDomain) {
        // If it is incompleted, then try to combine
        // with the dataDomain
        const combined = combineContinuousDomains(
          parseContinuousDomain(config.domain.map(parseDateTimeIfPossible), type),
          parseContinuousDomain(removeUndefinedAndNull(dataDomain), type),
        );
        if (combined) {
          scale.domain(order(combined));
        }
      }
    } else if (dataDomain) {
      // If no config.domain then just use the dataDomain if any
      scale.domain(order(parseContinuousDomain(removeUndefinedAndNull(dataDomain), type)));
    }
  } else if (isDiscreteScale(scale, type) && isDiscreteScaleConfig(config)) {
    // For discrete scales
    if (config.domain) {
      const fixedDomain = parseDiscreteDomain(config.domain.map(parseDateTimeIfPossible));
      scale.domain(
        order(
          dataDomain
            ? combineCategories(fixedDomain, parseDiscreteDomain(dataDomain))
            : fixedDomain,
        ),
      );
    } else if (dataDomain) {
      // If no config.domain then just use the dataDomain if any
      scale.domain(order(parseDiscreteDomain(dataDomain)));
    }
  }
}
