import OverwritePolicy from '../models/OverwritePolicy';

interface ItemWithValue<V> {
  /** stored value */
  value: V;
}

interface ItemWithLoader<L> {
  /** function that returns value */
  loader: () => L;
}

export interface RegistryStore<V, L extends V | Promise<V>> {
  /**
   * If this is a global registry, it will be defined.
   */
  globalId?: string;
  /** name of this registry */
  name?: string;
  /** schema version, can be used to check compatibility */
  version: string;
  /**
   * fallback key to use if `.get()` was called without a key
   * This was the initial value when the registry was created.
   */
  initialDefaultKey?: string;
  /**
   * fallback key to use if `.get()` was called without a key
   * This is the current default key.
   */
  defaultKey?: string;
  /** set the first item registered as the default */
  setFirstItemAsDefault: boolean;
  /** define if registering with an existing key is allowed, prohibited or warned */
  overwritePolicy: OverwritePolicy;

  /** map to lookup items by key */
  items: {
    [key: string]: ItemWithValue<V> | ItemWithLoader<L>;
  };
  /** map to lookup promises by key */
  promises: {
    [key: string]: Promise<V>;
  };
}

export interface RegistryConfig {
  /**
   * Set this value to define a global registry.
   * This will make it a true singleton and accessible via this `globalId` from any package.
   */
  globalId?: string;
  /** schema version, can be used to check compatibility */
  version?: string;
  /** name of this registry */
  name?: string;
  /** fallback key to use if `.get()` was called without a key */
  defaultKey?: string;
  /** set the first item registered as the default */
  setFirstItemAsDefault?: boolean;
  /** define if registering with an existing key is allowed, prohibited or warned */
  overwritePolicy?: OverwritePolicy;
}
