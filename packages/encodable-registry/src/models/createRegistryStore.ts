import { RegistryConfig, RegistryStore } from '../types';
import OverwritePolicy from './OverwritePolicy';

/**
 * Create a registry store from the given config
 * @param config
 */
export default function createRegistryStore<V, W extends V | Promise<V>>({
  globalId,
  name,
  defaultKey,
  setFirstItemAsDefault = false,
  overwritePolicy = OverwritePolicy.ALLOW,
}: RegistryConfig): RegistryStore<V, W> {
  return {
    globalId,
    name,
    defaultKey,
    initialDefaultKey: defaultKey,
    setFirstItemAsDefault,
    overwritePolicy,
    items: {},
    promises: {},
  };
}
