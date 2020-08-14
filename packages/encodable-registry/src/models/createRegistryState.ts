import { RegistryConfig, RegistryState } from '../types';
import OverwritePolicy from './OverwritePolicy';

/**
 * Create a registry state from the given config
 * @param config
 */
export default function createRegistryState<V, W extends V | Promise<V>>({
  globalId,
  name,
  version = '0.x.x',
  defaultKey,
  setFirstItemAsDefault = false,
  overwritePolicy = OverwritePolicy.ALLOW,
}: RegistryConfig): RegistryState<V, W> {
  return {
    globalId,
    name,
    version,
    defaultKey,
    initialDefaultKey: defaultKey,
    setFirstItemAsDefault,
    overwritePolicy,
    items: {},
    promises: {},
  };
}
