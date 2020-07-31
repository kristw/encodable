/* eslint no-console: 0 */
import { getStore } from 'global-box';
import OverwritePolicy from './OverwritePolicy';
import { RegistryStore, RegistryStoreConfig } from '../types';
import createRegistryStore from './createRegistryStore';

export type RegistryConfig = RegistryStoreConfig &
  ({ isGlobal?: false } | { isGlobal: true; registryId: string });

/**
 * Registry class
 *
 * Can use generic to specify type of item in the registry
 * @type V Type of value
 * @type W Type of value returned from loader function when using registerLoader().
 * W can be either V, Promise<V> or V | Promise<V>
 * Set W=V when does not support asynchronous loader.
 * By default W is set to V | Promise<V> to support
 * both synchronous and asynchronous loaders.
 */
export default class Registry<V, W extends V | Promise<V> = V | Promise<V>> {
  store: RegistryStore<V, W>;

  constructor(config: RegistryConfig = {}) {
    if (config.isGlobal) {
      this.store = getStore().getOrCreate(config.registryId, () =>
        createRegistryStore<V, W>(config),
      );
    } else {
      this.store = createRegistryStore<V, W>(config);
    }
  }

  clear() {
    this.store.items = {};
    this.store.promises = {};
    this.store.defaultKey = this.store.initialDefaultKey;

    return this;
  }

  has(key: string) {
    const item = this.store.items[key];

    return item !== null && item !== undefined;
  }

  registerValue(key: string, value: V) {
    const item = this.store.items[key];
    const willOverwrite =
      this.has(key) && (('value' in item && item.value !== value) || 'loader' in item);
    if (willOverwrite) {
      if (this.store.overwritePolicy === OverwritePolicy.WARN) {
        console.warn(`Item with key "${key}" already exists. You are assigning a new value.`);
      } else if (this.store.overwritePolicy === OverwritePolicy.PROHIBIT) {
        throw new Error(`Item with key "${key}" already exists. Cannot overwrite.`);
      }
    }
    if (!item || willOverwrite) {
      this.store.items[key] = { value };
      delete this.store.promises[key];
    }

    // If there is no default, set as default
    if (this.store.setFirstItemAsDefault && !this.store.defaultKey) {
      this.store.defaultKey = key;
    }

    return this;
  }

  registerLoader(key: string, loader: () => W) {
    const item = this.store.items[key];
    const willOverwrite =
      this.has(key) && (('loader' in item && item.loader !== loader) || 'value' in item);
    if (willOverwrite) {
      if (this.store.overwritePolicy === OverwritePolicy.WARN) {
        console.warn(`Item with key "${key}" already exists. You are assigning a new value.`);
      } else if (this.store.overwritePolicy === OverwritePolicy.PROHIBIT) {
        throw new Error(`Item with key "${key}" already exists. Cannot overwrite.`);
      }
    }
    if (!item || willOverwrite) {
      this.store.items[key] = { loader };
      delete this.store.promises[key];
    }

    // If there is no default, set as default
    if (this.store.setFirstItemAsDefault && !this.store.defaultKey) {
      this.store.defaultKey = key;
    }

    return this;
  }

  get(key?: string): V | W | undefined {
    const targetKey = key ?? this.store.defaultKey;

    if (typeof targetKey === 'undefined') return undefined;

    const item = this.store.items[targetKey];
    if (item !== undefined) {
      if ('loader' in item) {
        return item.loader && item.loader();
      }

      return item.value;
    }

    return undefined;
  }

  getAsPromise(key: string): Promise<V> {
    const promise = this.store.promises[key];

    if (typeof promise !== 'undefined') {
      return promise;
    }
    const item = this.get(key);
    if (item !== undefined) {
      const newPromise = Promise.resolve(item) as Promise<V>;
      this.store.promises[key] = newPromise;

      return newPromise;
    }

    return Promise.reject<V>(new Error(`Item with key "${key}" is not registered.`));
  }

  getDefaultKey() {
    return this.store.defaultKey;
  }

  setDefaultKey(key: string) {
    this.store.defaultKey = key;

    return this;
  }

  clearDefaultKey() {
    this.store.defaultKey = undefined;

    return this;
  }

  getMap() {
    return this.keys().reduce<{
      [key: string]: V | W | undefined;
    }>((prev, key) => {
      const map = prev;
      map[key] = this.get(key);

      return map;
    }, {});
  }

  getMapAsPromise() {
    const keys = this.keys();

    return Promise.all(keys.map(key => this.getAsPromise(key))).then(values =>
      values.reduce<{
        [key: string]: V;
      }>((prev, value, i) => {
        const map = prev;
        map[keys[i]] = value;

        return map;
      }, {}),
    );
  }

  keys(): string[] {
    return Object.keys(this.store.items);
  }

  values(): (V | W | undefined)[] {
    return this.keys().map(key => this.get(key));
  }

  valuesAsPromise(): Promise<V[]> {
    return Promise.all(this.keys().map(key => this.getAsPromise(key)));
  }

  entries(): { key: string; value: V | W | undefined }[] {
    return this.keys().map(key => ({
      key,
      value: this.get(key),
    }));
  }

  entriesAsPromise(): Promise<{ key: string; value: V }[]> {
    const keys = this.keys();

    return Promise.all(keys.map(key => this.getAsPromise(key))).then(values =>
      values.map((value, i) => ({
        key: keys[i],
        value,
      })),
    );
  }

  remove(key: string) {
    delete this.store.items[key];
    delete this.store.promises[key];

    return this;
  }
}
