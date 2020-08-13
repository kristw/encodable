import { SyncRegistry, RegistryConfig } from '@encodable/registry';
import { ColorNamespaceStore } from './types';
import ColorNamespace from './ColorNamespace';

export const DEFAULT_NAMESPACE = 'DEFAULT_NAMESPACE';

export default class ColorNamespaceRegistry {
  private namespaceStores: SyncRegistry<ColorNamespaceStore>;

  private namespaceInstances: SyncRegistry<ColorNamespace>;

  constructor({ name = 'ColorNamespaceRegistry', globalId, ...rest }: RegistryConfig = {}) {
    // only make the store global is using globalId
    this.namespaceStores = new SyncRegistry<ColorNamespaceStore>({ name, globalId, ...rest });
    // the instances are always local since these are wrappers
    this.namespaceInstances = new SyncRegistry<ColorNamespace>({ name, ...rest });

    if (typeof this.namespaceStores.getDefaultKey() === 'undefined') {
      this.setDefaultNamespace(DEFAULT_NAMESPACE);
    }
  }

  getDefaultNamespace(): string {
    return this.namespaceStores.getDefaultKey() ?? DEFAULT_NAMESPACE;
  }

  setDefaultNamespace(namespace: string) {
    this.namespaceStores.setDefaultKey(namespace);
    this.namespaceInstances.setDefaultKey(namespace);

    return this;
  }

  has(namespace: string) {
    return this.namespaceStores.has(namespace);
  }

  get(namespace: string = this.getDefaultNamespace()): ColorNamespace {
    if (!this.namespaceStores.has(namespace)) {
      const ns = new ColorNamespace(namespace);
      this.namespaceStores.registerValue(namespace, ns.store);
      this.namespaceInstances.registerValue(namespace, ns);
      return ns;
    }

    if (!this.namespaceInstances.has(namespace)) {
      const ns = new ColorNamespace(this.namespaceStores.get(namespace)!);
      this.namespaceInstances.registerValue(namespace, ns);
      return ns;
    }

    return this.namespaceInstances.get(namespace)!;
  }

  keys() {
    return this.namespaceStores.keys();
  }

  clear() {
    this.namespaceStores.clear();
    this.namespaceInstances.clear();
    return this;
  }

  remove(namespace: string) {
    this.namespaceStores.remove(namespace);
    this.namespaceInstances.remove(namespace);
    return this;
  }
}
