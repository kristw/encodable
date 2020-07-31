import { RegistryStoreConfig, RegistryStore } from '../types';
import OverwritePolicy from './OverwritePolicy';

export default function createRegistryStore<V, W extends V | Promise<V>>({
  name = '',
  defaultKey,
  setFirstItemAsDefault = false,
  overwritePolicy = OverwritePolicy.ALLOW,
}: RegistryStoreConfig): RegistryStore<V, W> {
  return {
    name,
    defaultKey,
    initialDefaultKey: defaultKey,
    setFirstItemAsDefault,
    overwritePolicy,
    items: {},
    promises: {},
  };
}
