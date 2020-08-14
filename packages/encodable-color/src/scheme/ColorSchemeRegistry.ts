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

  get(schemeId?: string): ColorSchemeWrapper | undefined {
    const targetKey = schemeId ?? this.getDefaultKey();

    if (typeof targetKey === 'undefined') {
      return undefined;
    }

    const value = super.get(targetKey);

    if (typeof value === 'undefined') {
      return value;
    }

    if (this.wrappers.has(targetKey)) {
      return this.wrappers.get(schemeId);
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

  remove(schemeId: string) {
    super.remove(schemeId);
    this.categorical._remove(schemeId);
    this.sequential._remove(schemeId);
    this.diverging._remove(schemeId);

    return this;
  }

  register(scheme: ColorScheme | ColorScheme[]) {
    if (Array.isArray(scheme)) {
      scheme.forEach(v => {
        this.registerValue(v.id, v);
      });
      return this;
    }
    return this.registerValue(scheme.id, scheme);
  }

  registerValue(schemeId: string, scheme: ColorScheme) {
    switch (scheme.type) {
      case 'categorical':
        super.registerValue(schemeId, scheme);
        this.categorical._registerValue(schemeId, scheme);
        break;
      case 'sequential':
        super.registerValue(schemeId, scheme);
        this.sequential._registerValue(schemeId, scheme);
        break;
      case 'diverging':
        super.registerValue(schemeId, scheme);
        this.diverging._registerValue(schemeId, scheme);
        break;
      default:
    }

    return this;
  }

  registerLoader(schemeId: string, loader: () => ColorScheme) {
    const value = loader();

    switch (value.type) {
      case 'categorical':
        super.registerLoader(schemeId, loader);
        this.categorical._registerLoader(schemeId, loader as () => CategoricalScheme);
        break;
      case 'sequential':
        super.registerLoader(schemeId, loader);
        this.sequential._registerLoader(schemeId, loader as () => SequentialScheme);
        break;
      case 'diverging':
        super.registerLoader(schemeId, loader);
        this.diverging._registerLoader(schemeId, loader as () => DivergingScheme);
        break;
      default:
    }

    return this;
  }
}
