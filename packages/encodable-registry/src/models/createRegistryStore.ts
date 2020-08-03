import { RegistryConfig, RegistryStore } from '../types';
import OverwritePolicy from './OverwritePolicy';

/**
 * Create a registry store from the given config
 * @param config
 */
export default function createRegistryStore<V, W extends V | Promise<V>>({
  globalId,
  name,
  version = '0.x.x',
  defaultKey,
  setFirstItemAsDefault = false,
  overwritePolicy = OverwritePolicy.ALLOW,
}: RegistryConfig): RegistryStore<V, W> {
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
