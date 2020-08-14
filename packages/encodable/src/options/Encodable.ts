import { getStore } from 'global-box';
import {
  EncodableState,
  NumberFormatResolver,
  TimeFormatResolver,
  CategoricalColorScaleResolver,
  ColorSchemeResolver,
} from '../types';
import {
  defaultNumberFormatResolver,
  defaultTimeFormatResolver,
  defaultCategoricalColorScaleResolver,
  defaultColorSchemeResolver,
} from './resolvers';

const CACHE_KEY = '@encodable/encodable:options';

class OptionsManager {
  options: EncodableState;

  constructor() {
    this.options = getStore().getOrCreate<EncodableState>(CACHE_KEY, () => ({}));
  }

  getNumberFormatResolver(): NumberFormatResolver {
    return this.options.numberFormatResolver ?? defaultNumberFormatResolver;
  }

  setNumberFormatResolver(resolver: NumberFormatResolver | undefined) {
    this.options.numberFormatResolver = resolver;
    return this;
  }

  resetNumberFormatResolver() {
    return this.setNumberFormatResolver(undefined);
  }

  resolveNumberFormat(...params: Parameters<NumberFormatResolver>) {
    return this.getNumberFormatResolver()(...params);
  }

  getTimeFormatResolver(): TimeFormatResolver {
    return this.options.timeFormatResolver ?? defaultTimeFormatResolver;
  }

  setTimeFormatResolver(resolver: TimeFormatResolver | undefined) {
    this.options.timeFormatResolver = resolver;
    return this;
  }

  resetTimeFormatResolver() {
    return this.setTimeFormatResolver(undefined);
  }

  resolveTimeFormat(...params: Parameters<TimeFormatResolver>) {
    return this.getTimeFormatResolver()(...params);
  }

  getCategoricalColorScaleResolver(): CategoricalColorScaleResolver {
    return this.options.categoricalColorScaleResolver ?? defaultCategoricalColorScaleResolver;
  }

  setCategoricalColorScaleResolver(resolver: CategoricalColorScaleResolver | undefined) {
    this.options.categoricalColorScaleResolver = resolver;
    return this;
  }

  resetCategoricalColorScaleResolver() {
    return this.setCategoricalColorScaleResolver(undefined);
  }

  resolveCategoricalColorScale(...params: Parameters<CategoricalColorScaleResolver>) {
    return this.getCategoricalColorScaleResolver()(...params);
  }

  getColorSchemeResolver(): ColorSchemeResolver {
    return this.options.colorSchemeResolver ?? defaultColorSchemeResolver;
  }

  setColorSchemeResolver(resolver: ColorSchemeResolver | undefined) {
    this.options.colorSchemeResolver = resolver;
    return this;
  }

  resetColorSchemeResolver() {
    return this.setColorSchemeResolver(undefined);
  }

  resolveColorScheme(...params: Parameters<ColorSchemeResolver>) {
    return this.getColorSchemeResolver()(...params);
  }
}

const Encodable = new OptionsManager();

export default Encodable;
