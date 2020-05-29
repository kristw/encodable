import { Value } from '../../types/VegaLite';
import { ScaleConfig, D3Scale } from '../../types/Scale';
import inferElementTypeFromUnionOfArrayTypes from '../../utils/inferElementTypeFromUnionOfArrayTypes';
import { isContinuousScale, isDiscretizingScale } from '../../typeGuards/Scale';
import combineCategories from '../../utils/combineCategories';
import parseDateTimeIfPossible from '../parseDateTimeIfPossible';
import parseContinuousDomain from '../domain/parseContinuousDomain';
import parseDiscreteDomain from '../domain/parseDiscreteDomain';
import combineContinuousDomains from '../../utils/combineContinuousDomains';
import { ChannelInput } from '../../types/Channel';
import removeUndefinedAndNull from '../../utils/removeUndefinedAndNull';

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

  const inputDomain = domainFromDataset?.length
    ? inferElementTypeFromUnionOfArrayTypes(domainFromDataset)
    : undefined;

  if (domain?.length) {
    const fixedDomain = inferElementTypeFromUnionOfArrayTypes(domain).map(parseDateTimeIfPossible);

    if (isContinuousScale(scale, type)) {
      const combined = combineContinuousDomains(
        parseContinuousDomain(fixedDomain, type),
        inputDomain && removeUndefinedAndNull(parseContinuousDomain(inputDomain, type)),
      );
      if (combined) {
        scale.domain(order(combined));
      }
    } else if (isDiscretizingScale(scale, type)) {
      // For discretizing scales, if the domain is specified in config,
      // use that and ignore the domain from dataset
      scale.domain(order(parseContinuousDomain(fixedDomain, type)));
    } else {
      scale.domain(
        order(
          combineCategories(
            parseDiscreteDomain(fixedDomain),
            inputDomain && parseDiscreteDomain(inputDomain),
          ),
        ),
      );
    }
  } else if (inputDomain) {
    if (isContinuousScale(scale, type)) {
      scale.domain(order(removeUndefinedAndNull(parseContinuousDomain(inputDomain, type))));
    } else if (isDiscretizingScale(scale, type)) {
      scale.domain(order(parseContinuousDomain(inputDomain, type)));
    } else {
      scale.domain(order(parseDiscreteDomain(inputDomain)));
    }
  }
}
