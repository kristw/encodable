/* eslint no-console: 0 */
import { globalBox } from 'global-box';
import OverwritePolicy from './OverwritePolicy';
import { RegistryStore, RegistryConfig } from '../types';
import createRegistryStore from './createRegistryStore';

/**
 * Registry class
 *
 * Can use generic to specify type of item in the registry
 * @type V Type of value
 * @type L Type of value returned from loader function when using `registerLoader()`.
 * `L` can be either `V`, `Promise<V>` or `V | Promise<V>`
 * Set `L=V` when does not support asynchronous loader.
 * By default `L` is set to `V | Promise<V>` to support
 * both synchronous and asynchronous loaders.
 */
export default class Registry<V, L extends V | Promise<V> = V | Promise<V>> {
  readonly store: RegistryStore<V, L>;

  constructor(config: RegistryConfig = {}) {
    if (typeof config.globalId === 'undefined') {
      this.store = createRegistryStore<V, L>(config);
    } else {
      this.store = globalBox().getOrCreate(config.globalId, () =>
        createRegistryStore<V, L>(config),
      );
    }
  }

  /**
   * Clear all item in the registry.
   * Reset default key to initial default key (if any)
   */
  clear() {
    this.store.items = {};
    this.store.promises = {};
    this.store.defaultKey = this.store.initialDefaultKey;

    return this;
  }

  /**
   * Check if item with the given key exists
   * @param key the key to look for
   */
  has(key: string) {
    const item = this.store.items[key];

    return item !== null && item !== undefined;
  }

  /**
   * Register key with a value
   * @param key
   * @param value
   */
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

  /**
   * Register key with a loader, a function that returns a value.
   * @param key
   * @param loader
   */
  registerLoader(key: string, loader: () => L) {
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

  /**
   * Get value from the specified key.
   * If the item contains a loader, invoke the loader and return its output.
   * @param key
   */
  get(key?: string): V | L | undefined {
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

  /**
   * Similar to `.get()` but wrap results in a `Promise`.
   * This is useful when some items are async loaders to provide uniform output.
   * @param key
   */
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

  /**
   * Return the current default key.
   * Default key is a fallback key to use if `.get()` was called without a key.
   */
  getDefaultKey() {
    return this.store.defaultKey;
  }

  /**
   * Set default key to the specified key
   * Default key is a fallback key to use if `.get()` was called without a key.
   * @param key
   */
  setDefaultKey(key: string) {
    this.store.defaultKey = key;

    return this;
  }

  /**
   * Remove default key.
   * Default key is a fallback key to use if `.get()` was called without a key.
   */
  clearDefaultKey() {
    this.store.defaultKey = undefined;

    return this;
  }

  /**
   * Return a map of all key-values in this registry.
   */
  getMap() {
    return this.keys().reduce<{
      [key: string]: V | L | undefined;
    }>((prev, key) => {
      const map = prev;
      map[key] = this.get(key);

      return map;
    }, {});
  }

  /**
   * Same with `.getMap()` but return a `Promise` that resolves when all values are resolved.
   */
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

  /**
   * Return all keys in this registry.
   */
  keys(): string[] {
    return Object.keys(this.store.items);
  }

  /**
   * Return all values in this registry.
   * For loaders, they are invoked and their outputs are returned.
   */
  values(): (V | L | undefined)[] {
    return this.keys().map(key => this.get(key));
  }

  /**
   * Same with `.values()` but return a `Promise` that resolves when all values are resolved.
   */
  valuesAsPromise(): Promise<V[]> {
    return Promise.all(this.keys().map(key => this.getAsPromise(key)));
  }

  /**
   * Return all key-value entries in this registry.
   */
  entries(): { key: string; value: V | L | undefined }[] {
    return this.keys().map(key => ({
      key,
      value: this.get(key),
    }));
  }

  /**
   * Same with `.entries()` but return a `Promise` that resolves when all values are resolved.
   */
  entriesAsPromise(): Promise<{ key: string; value: V }[]> {
    const keys = this.keys();

    return Promise.all(keys.map(key => this.getAsPromise(key))).then(values =>
      values.map((value, i) => ({
        key: keys[i],
        value,
      })),
    );
  }

  /**
   * Remove the item with the specified key.
   * Do nothing if an item with the given key does not exist.
   * @param key
   */
  remove(key: string) {
    delete this.store.items[key];
    delete this.store.promises[key];

    return this;
  }

  /**
   * Get number of items in the registry
   */
  size() {
    return this.keys().length;
  }

  /**
   * Returns true if there is no item in the registry
   */
  isEmpty() {
    return this.size() === 0;
  }
}
