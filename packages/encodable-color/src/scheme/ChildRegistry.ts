/* eslint-disable no-underscore-dangle */
import { SyncRegistry, RegistryConfig } from '@encodable/registry';
import { ColorScheme } from '../types';

type ChildRegistryConfig = Pick<RegistryConfig, 'defaultKey'> & {
  name: string;
};

export default class ChildRegistry<V extends ColorScheme> extends SyncRegistry<V> {
  parent: SyncRegistry<ColorScheme>;

  constructor(parent: SyncRegistry<ColorScheme>, { name, defaultKey }: ChildRegistryConfig) {
    super({
      name,
      defaultKey,
      globalId:
        typeof parent.store.globalId === 'undefined'
          ? undefined
          : `${parent.store.globalId}:${name}`,
      overwritePolicy: parent.store.overwritePolicy,
      setFirstItemAsDefault: parent.store.setFirstItemAsDefault,
    });

    this.parent = parent;
  }

  _registerValue(key: string, value: V) {
    return super.registerValue(key, value);
  }

  registerValue(key: string, value: V) {
    this.parent.registerValue(key, value);
    return this;
  }

  _registerLoader(key: string, loader: () => V) {
    return super.registerLoader(key, loader);
  }

  registerLoader(key: string, loader: () => V) {
    this.parent.registerLoader(key, loader);
    return this;
  }

  clear() {
    this.keys().forEach(key => this.parent.remove(key));
    return super.clear();
  }

  _clear() {
    return super.clear();
  }

  remove(key: string) {
    this.parent.remove(key);
    return this;
  }

  _remove(key: string) {
    return super.remove(key);
  }
}
