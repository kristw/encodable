/**
 * simple key-value store
 */
export default class Store {
  private readonly items: {
    [key: string]: unknown;
  };

  constructor() {
    this.items = {};
  }

  /**
   * Check if the item with given key exists
   * @param key
   */
  has(key: string) {
    const item = this.items[key];

    return item != null;
  }

  /**
   * Get value from key and cast to type T
   * @param key
   */
  get<T>(key: string) {
    const value = this.items[key] as T | undefined;

    return value;
  }

  /**
   * Get value from key if the value exists.
   * Otherwise, create a new value.
   * @param key
   * @param factory
   */
  getOrCreate<T>(key: string, factory: () => T) {
    if (this.has(key)) {
      return this.get<T>(key) as T;
    }
    const value = factory();
    this.set(key, value);

    return value;
  }

  /**
   * Store the given key and value
   * @param key
   * @param value
   */
  set<T>(key: string, value: T) {
    if (this.has(key)) {
      // eslint-disable-next-line no-console
      console.warn(`Item with key "${key}" already exists. You are assigning a new value.`);
    }
    this.items[key] = value;

    return this;
  }

  /**
   * Remove item with the specified key from this store.
   * If the item with key does not exist, do nothing.
   * @param key
   */
  remove(key: string) {
    delete this.items[key];

    return this;
  }
}
