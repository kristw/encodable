import { DiscreteInput } from '../../types/ScaleConfig';

/**
 * Discrete domains are converted into string[]
 * when using D3 scales
 * @param domain
 */
export default function parseDiscreteDomain<T extends DiscreteInput | undefined | null>(
  domain: T[],
) {
  return domain.map(d => `${d}`);
}
