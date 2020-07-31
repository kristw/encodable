import OverwritePolicy from '../models/OverwritePolicy';

interface ItemWithValue<T> {
  value: T;
}

interface ItemWithLoader<T> {
  loader: () => T;
}

export interface RegistryStore<V, W extends V | Promise<V>> {
  name: string;
  initialDefaultKey?: string;
  defaultKey?: string;
  setFirstItemAsDefault: boolean;
  overwritePolicy: OverwritePolicy;
  items: {
    [key: string]: ItemWithValue<V> | ItemWithLoader<W>;
  };

  promises: {
    [key: string]: Promise<V>;
  };
}

export interface RegistryStoreConfig {
  name?: string;
  defaultKey?: string;
  setFirstItemAsDefault?: boolean;
  overwritePolicy?: OverwritePolicy;
}

export type RegistryConfig = RegistryStoreConfig &
  ({ isGlobal?: false } | { isGlobal: true; globalId: string });
