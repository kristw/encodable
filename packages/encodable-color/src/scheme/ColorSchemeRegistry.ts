/* eslint-disable no-underscore-dangle */
import { SyncRegistry, OverwritePolicy, RegistryConfig } from '@encodable/registry';
import { ColorScheme, CategoricalScheme, SequentialScheme, DivergingScheme } from '../types';
import ChildRegistry from './ChildRegistry';

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

    this.categorical = new ChildRegistry<CategoricalScheme>(this, { name: 'categorical' });
    this.sequential = new ChildRegistry<SequentialScheme>(this, { name: 'sequential' });
    this.diverging = new ChildRegistry<DivergingScheme>(this, { name: 'diverging' });
  }

  clear() {
    super.clear();
    this.categorical._clear();
    this.sequential._clear();
    this.diverging._clear();

    return this;
  }

  remove(key: string) {
    super.remove(key);
    this.categorical._remove(key);
    this.sequential._remove(key);
    this.diverging._remove(key);

    return this;
  }

  registerValue(key: string, value: ColorScheme) {
    super.registerValue(key, value);
    switch (value.type) {
      case 'categorical':
        this.categorical._registerValue(key, value);
        break;
      case 'sequential':
        this.sequential._registerValue(key, value);
        break;
      case 'diverging':
        this.diverging._registerValue(key, value);
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
        this.categorical._registerLoader(key, loader as () => CategoricalScheme);
        break;
      case 'sequential':
        this.sequential._registerLoader(key, loader as () => SequentialScheme);
        break;
      case 'diverging':
        this.diverging._registerLoader(key, loader as () => DivergingScheme);
        break;
      default:
    }

    return this;
  }
}
