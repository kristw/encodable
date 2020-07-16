import { Value } from '../../types/VegaLite';
import { D3Scale } from '../../types/Scale';
import { ScaleConfig } from '../../types/ScaleConfig';
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

  const inputDomain = domainFromDataset?.length
    ? inferElementTypeFromUnionOfArrayTypes(domainFromDataset)
    : undefined;

  if (domain?.length) {
    if (
      (isContinuousScale(scale, type) && isContinuousScaleConfig(config)) ||
      (isDiscretizingScale(scale, type) && isDiscretizingScaleConfig(config))
    ) {
      const fixedDomain = inferElementTypeFromUnionOfArrayTypes(config.domain).map(
        parseDateTimeIfPossible,
      );
      const combined = combineContinuousDomains(
        parseContinuousDomain(fixedDomain, type),
        inputDomain && parseContinuousDomain(removeUndefinedAndNull(inputDomain), type),
      );
      if (combined) {
        scale.domain(order(combined));
      }
    } else {
      const fixedDomain = inferElementTypeFromUnionOfArrayTypes(config.domain).map(
        parseDateTimeIfPossible,
      );
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
    if (isContinuousScale(scale, type) || isDiscretizingScale(scale, type)) {
      scale.domain(order(parseContinuousDomain(removeUndefinedAndNull(inputDomain), type)));
    } else {
      scale.domain(order(parseDiscreteDomain(inputDomain)));
    }
  }
}
