import { SyncRegistry, OverwritePolicy } from '@encodable/registry';
import { RegistryConfig } from '@encodable/registry/lib/models/Registry';
import { ColorScheme, CategoricalScheme, SequentialScheme, DivergingScheme } from './types';

type ChildRegistry<T> = SyncRegistry<T>; // Omit<SyncRegistry<T>, 'registerLoader' | 'clear' | 'remove'>;

export default class ColorSchemeRegistry extends SyncRegistry<ColorScheme> {
  categorical: ChildRegistry<CategoricalScheme>;

  sequential: ChildRegistry<SequentialScheme>;

  diverging: ChildRegistry<DivergingScheme>;

  constructor({
    name = 'ColorScheme',
    overwritePolicy = OverwritePolicy.WARN,
    setFirstItemAsDefault = true,
    ...rest
  }: RegistryConfig = {}) {
    super({ name, overwritePolicy, setFirstItemAsDefault, ...rest });

    this.categorical = new SyncRegistry<CategoricalScheme>();
    this.sequential = new SyncRegistry<SequentialScheme>();
    this.diverging = new SyncRegistry<DivergingScheme>();
  }

  clear() {
    super.clear();
    this.categorical.clear();
    this.sequential.clear();
    this.diverging.clear();

    return this;
  }

  remove(key: string) {
    super.remove(key);
    this.categorical.remove(key);
    this.sequential.remove(key);
    this.diverging.remove(key);

    return this;
  }

  registerValue(key: string, value: ColorScheme) {
    super.registerValue(key, value);
    switch (value.type) {
      case 'categorical':
        this.categorical.registerValue(key, value);
        break;
      case 'sequential':
        this.sequential.registerValue(key, value);
        break;
      case 'diverging':
        this.diverging.registerValue(key, value);
        break;
      default:
    }

    return this;
  }

  registerLoader(key: string, loader: () => ColorScheme) {
    super.registerLoader(key, loader);

    const value = loader();

    switch (value.type) {
      case 'categorical':
        this.categorical.registerValue(key, value);
        break;
      case 'sequential':
        this.sequential.registerValue(key, value);
        break;
      case 'diverging':
        this.diverging.registerValue(key, value);
        break;
      default:
    }

    return this;
  }
}
