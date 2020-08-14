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
  state: EncodableState;

  constructor() {
    this.state = getStore().getOrCreate<EncodableState>(CACHE_KEY, () => ({}));
  }

  getNumberFormatResolver(): NumberFormatResolver {
    return this.state.numberFormatResolver ?? defaultNumberFormatResolver;
  }

  setNumberFormatResolver(resolver: NumberFormatResolver | undefined) {
    this.state.numberFormatResolver = resolver;
    return this;
  }

  resetNumberFormatResolver() {
    return this.setNumberFormatResolver(undefined);
  }

  resolveNumberFormat(...params: Parameters<NumberFormatResolver>) {
    return this.getNumberFormatResolver()(...params);
  }

  getTimeFormatResolver(): TimeFormatResolver {
    return this.state.timeFormatResolver ?? defaultTimeFormatResolver;
  }

  setTimeFormatResolver(resolver: TimeFormatResolver | undefined) {
    this.state.timeFormatResolver = resolver;
    return this;
  }

  resetTimeFormatResolver() {
    return this.setTimeFormatResolver(undefined);
  }

  resolveTimeFormat(...params: Parameters<TimeFormatResolver>) {
    return this.getTimeFormatResolver()(...params);
  }

  getCategoricalColorScaleResolver(): CategoricalColorScaleResolver {
    return this.state.categoricalColorScaleResolver ?? defaultCategoricalColorScaleResolver;
  }

  setCategoricalColorScaleResolver(resolver: CategoricalColorScaleResolver | undefined) {
    this.state.categoricalColorScaleResolver = resolver;
    return this;
  }

  resetCategoricalColorScaleResolver() {
    return this.setCategoricalColorScaleResolver(undefined);
  }

  resolveCategoricalColorScale(...params: Parameters<CategoricalColorScaleResolver>) {
    return this.getCategoricalColorScaleResolver()(...params);
  }

  getColorSchemeResolver(): ColorSchemeResolver {
    return this.state.colorSchemeResolver ?? defaultColorSchemeResolver;
  }

  setColorSchemeResolver(resolver: ColorSchemeResolver | undefined) {
    this.state.colorSchemeResolver = resolver;
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
