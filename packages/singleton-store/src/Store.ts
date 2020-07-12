export default class Store {
  private readonly items: {
    [key: string]: unknown;
  };

  constructor() {
    this.items = {};
  }

  has(key: string) {
    const item = this.items[key];

    return item != null;
  }

  get<T>(key: string): T | undefined {
    const value = this.items[key];

    return typeof value === 'undefined' ? undefined : (value as T);
  }

  getOrCreate<T>(key: string, factory: () => T) {
    if (this.has(key)) {
      return this.get<T>(key);
    }
    const value = factory();
    this.set(key, value);

    return value;
  }

  set<T>(key: string, item: T) {
    if (this.has(key)) {
      // eslint-disable-next-line no-console
      console.warn(`Item with key "${key}" already exists. You are assigning a new value.`);
    }
    this.items[key] = item;

    return this;
  }

  remove(key: string) {
    delete this.items[key];

    return this;
  }
}
