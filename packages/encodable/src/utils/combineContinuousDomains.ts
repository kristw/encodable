import { isEveryElementDefined, isDefined } from '../typeGuards/Base';

/**
 * Combine two continuous domain and ensure that the output
 * does not go beyond fixedDomain
 * @param bounds
 * @param dataDomain
 */
export default function combineContinuousDomains(
  bounds: (number | Date | null | undefined)[],
  dataDomain: (number | Date)[],
) {
  if (bounds.length > 0 && isEveryElementDefined(bounds)) {
    return bounds;
  }
  if (bounds.length === 2 && dataDomain.length === 2 && bounds.filter(isDefined).length > 0) {
    const [boundMin, boundMax] = bounds;
    const [dataMin, dataMax] = dataDomain;
    let min = dataMin;
    if (isDefined(boundMin)) {
      min = boundMin.valueOf() > dataMin.valueOf() ? boundMin : dataMin;
    }
    let max = dataMax;
    if (isDefined(boundMax)) {
      max = boundMax.valueOf() < dataMax.valueOf() ? boundMax : dataMax;
    }

    return [min, max];
  }

  return dataDomain;
}
