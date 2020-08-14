/* eslint-disable no-underscore-dangle */
import { SyncRegistry, RegistryConfig } from '@encodable/registry';
import { ColorScheme } from '../types';

type ChildRegistryConfig = Pick<RegistryConfig, 'defaultKey'> & {
  name: string;
};

export default class ChildRegistry<
  Scheme extends ColorScheme,
  Wrapper extends Scheme
> extends SyncRegistry<Scheme> {
  private readonly parent: SyncRegistry<ColorScheme>;

  constructor(parent: SyncRegistry<ColorScheme>, { name, defaultKey }: ChildRegistryConfig) {
    super({
      name,
      defaultKey,
      globalId:
        typeof parent.state.globalId === 'undefined'
          ? undefined
          : `${parent.state.globalId}:${name}`,
      overwritePolicy: parent.state.overwritePolicy,
      setFirstItemAsDefault: parent.state.setFirstItemAsDefault,
    });

    this.parent = parent;
  }

  get(schemeId?: string): Wrapper | undefined {
    const targetKey = schemeId ?? this.getDefaultKey();
    return typeof targetKey !== 'undefined' && this.has(targetKey)
      ? (this.parent.get(targetKey)! as Wrapper)
      : undefined;
  }

  register(scheme: Scheme | Scheme[]) {
    if (Array.isArray(scheme)) {
      scheme.forEach(v => {
        this.registerValue(v.id, v);
      });
      return this;
    }
    return this.registerValue(scheme.id, scheme);
  }

  _registerValue(schemeId: string, scheme: Scheme) {
    return super.registerValue(schemeId, scheme);
  }

  registerValue(schemeId: string, scheme: Scheme) {
    this.parent.registerValue(schemeId, scheme);
    return this;
  }

  _registerLoader(schemeId: string, loader: () => Scheme) {
    return super.registerLoader(schemeId, loader);
  }

  registerLoader(schemeId: string, loader: () => Scheme) {
    this.parent.registerLoader(schemeId, loader);
    return this;
  }

  clear() {
    this.keys().forEach(key => this.parent.remove(key));
    return super.clear();
  }

  _clear() {
    return super.clear();
  }

  remove(schemeId: string) {
    this.parent.remove(schemeId);
    return this;
  }

  _remove(schemeId: string) {
    return super.remove(schemeId);
  }
}
