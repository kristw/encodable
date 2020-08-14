/* eslint-disable no-underscore-dangle */
import { SyncRegistry, OverwritePolicy, RegistryConfig } from '@encodable/registry';
import { ColorScheme, CategoricalScheme, SequentialScheme, DivergingScheme } from '../types';
import ChildRegistry from './ChildRegistry';
import wrapColorScheme, { ColorSchemeWrapper } from './wrappers/wrapColorScheme';
import CategoricalSchemeWrapper from './wrappers/CategoricalSchemeWrapper';
import SequentialSchemeWrapper from './wrappers/SequentialSchemeWrapper';
import DivergingSchemeWrapper from './wrappers/DivergingSchemeWrapper';

export default class ColorSchemeRegistry extends SyncRegistry<ColorScheme> {
  readonly categorical: ChildRegistry<CategoricalScheme, CategoricalSchemeWrapper>;

  readonly sequential: ChildRegistry<SequentialScheme, SequentialSchemeWrapper>;

  readonly diverging: ChildRegistry<DivergingScheme, DivergingSchemeWrapper>;

  private readonly wrappers: SyncRegistry<ColorSchemeWrapper>;

  constructor({
    name = 'ColorScheme',
    overwritePolicy = OverwritePolicy.WARN,
    setFirstItemAsDefault = true,
    ...rest
  }: RegistryConfig = {}) {
    super({ name, overwritePolicy, setFirstItemAsDefault, ...rest });

    this.categorical = new ChildRegistry<CategoricalScheme, CategoricalSchemeWrapper>(this, {
      name: 'categorical',
    });
    this.sequential = new ChildRegistry<SequentialScheme, SequentialSchemeWrapper>(this, {
      name: 'sequential',
    });
    this.diverging = new ChildRegistry<DivergingScheme, DivergingSchemeWrapper>(this, {
      name: 'diverging',
    });
    this.wrappers = new SyncRegistry<ColorSchemeWrapper>();
  }

  get(key?: string): ColorSchemeWrapper | undefined {
    const targetKey = key ?? this.getDefaultKey();

    if (typeof targetKey === 'undefined') {
      return undefined;
    }

    const value = super.get(targetKey);

    if (typeof value === 'undefined') {
      return value;
    }

    if (this.wrappers.has(targetKey)) {
      return this.wrappers.get(key);
    }

    const wrapper = wrapColorScheme(value);
    this.wrappers.registerValue(targetKey, wrapper);
    return wrapper;
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
    switch (value.type) {
      case 'categorical':
        super.registerValue(key, value);
        this.categorical._registerValue(key, value);
        break;
      case 'sequential':
        super.registerValue(key, value);
        this.sequential._registerValue(key, value);
        break;
      case 'diverging':
        super.registerValue(key, value);
        this.diverging._registerValue(key, value);
        break;
      default:
    }

    return this;
  }

  registerLoader(key: string, loader: () => ColorScheme) {
    const value = loader();

    switch (value.type) {
      case 'categorical':
        super.registerLoader(key, loader);
        this.categorical._registerLoader(key, loader as () => CategoricalScheme);
        break;
      case 'sequential':
        super.registerLoader(key, loader);
        this.sequential._registerLoader(key, loader as () => SequentialScheme);
        break;
      case 'diverging':
        super.registerLoader(key, loader);
        this.diverging._registerLoader(key, loader as () => DivergingScheme);
        break;
      default:
    }

    return this;
  }
}
