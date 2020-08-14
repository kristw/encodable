import { SyncRegistry, RegistryConfig } from '@encodable/registry';
import { ColorNamespaceState } from './types';
import ColorNamespace from './ColorNamespace';

export const DEFAULT_NAMESPACE = 'DEFAULT_NAMESPACE';

export default class ColorNamespaceRegistry {
  private readonly namespaceStates: SyncRegistry<ColorNamespaceState>;

  private readonly namespaceInstances: SyncRegistry<ColorNamespace>;

  constructor({ name = 'ColorNamespaceRegistry', globalId, ...rest }: RegistryConfig = {}) {
    // only make the state global is using globalId
    this.namespaceStates = new SyncRegistry<ColorNamespaceState>({ name, globalId, ...rest });
    // the instances are always local since these are wrappers
    this.namespaceInstances = new SyncRegistry<ColorNamespace>({ name, ...rest });

    if (typeof this.namespaceStates.getDefaultKey() === 'undefined') {
      this.setDefaultNamespace(DEFAULT_NAMESPACE);
    }
  }

  getDefaultNamespace(): string {
    return this.namespaceStates.getDefaultKey() ?? DEFAULT_NAMESPACE;
  }

  setDefaultNamespace(namespace: string) {
    this.namespaceStates.setDefaultKey(namespace);
    this.namespaceInstances.setDefaultKey(namespace);

    return this;
  }

  has(namespace: string) {
    return this.namespaceStates.has(namespace);
  }

  get(namespace: string = this.getDefaultNamespace()): ColorNamespace {
    if (!this.namespaceStates.has(namespace)) {
      const ns = new ColorNamespace(namespace);
      this.namespaceStates.registerValue(namespace, ns.state);
      this.namespaceInstances.registerValue(namespace, ns);
      return ns;
    }

    if (this.namespaceInstances.has(namespace)) {
      return this.namespaceInstances.get(namespace)!;
    }

    const ns = new ColorNamespace(this.namespaceStates.get(namespace)!);
    this.namespaceInstances.registerValue(namespace, ns);
    return ns;
  }

  keys() {
    return this.namespaceStates.keys();
  }

  clear() {
    this.namespaceStates.clear();
    this.namespaceInstances.clear();
    return this;
  }

  remove(namespace: string) {
    this.namespaceStates.remove(namespace);
    this.namespaceInstances.remove(namespace);
    return this;
  }
}
