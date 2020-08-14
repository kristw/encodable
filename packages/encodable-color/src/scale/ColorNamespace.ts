import { SyncRegistry } from '@encodable/registry';
import { getCategoricalScheme, getColorSchemeRegistry } from '../scheme';
import stringifyAndTrim from '../utils/stringifyAndTrim';
import { ColorNamespaceState } from './types';
import ScaleCategoricalColor from './ScaleCategoricalColor';

export default class ColorNamespace {
  readonly state: ColorNamespaceState;

  readonly scales: SyncRegistry<ScaleCategoricalColor>;

  constructor(nameOrState: string | ColorNamespaceState) {
    this.state =
      typeof nameOrState === 'string'
        ? {
            name: nameOrState,
            manualColors: {},
            scales: {},
          }
        : nameOrState;

    this.scales = new SyncRegistry<ScaleCategoricalColor>();
  }

  get name() {
    return this.state.name;
  }

  /**
   * Check if the specified value is subjected to manual color assignment
   * @param value
   */
  hasManualColor(value: string) {
    return typeof this.state.manualColors[stringifyAndTrim(value)] !== 'undefined';
  }

  /**
   * Enforce specific color for given value
   * This will apply across all color scales
   * in this namespace.
   * @param {*} value value
   * @param {*} manualColor color
   */
  setColor(value: string, manualColor: string) {
    this.state.manualColors[stringifyAndTrim(value)] = manualColor;

    return this;
  }

  /**
   * Removed enforced specific color for given value
   * This will apply across all color scales
   * in this namespace.
   * @param {*} value value
   * @param {*} manualColor color
   */
  unsetColor(value: string) {
    delete this.state.manualColors[stringifyAndTrim(value)];

    return this;
  }

  /**
   * Clear all manually assigned colors
   */
  clearManualColors() {
    this.state.manualColors = {};

    return this;
  }

  hasScale(scheme: string) {
    return typeof this.state.scales[scheme] !== 'undefined';
  }

  getScale(scheme?: string) {
    const schemeName =
      scheme ?? getColorSchemeRegistry().categorical.getDefaultKey() ?? 'undefined';
    if (typeof this.state.scales[schemeName] === 'undefined') {
      // create scale
      const scale = new ScaleCategoricalColor(
        getCategoricalScheme(schemeName)?.colors ?? [],
        this.state.manualColors,
      );
      // add state to lookup
      this.state.scales[schemeName] = scale.state;
      this.scales.registerValue(schemeName, scale);
      return scale;
    }

    if (this.scales.has(schemeName)) {
      return this.scales.get(schemeName)!;
    }

    // create scale
    const scale = new ScaleCategoricalColor(
      this.state.scales[schemeName]!,
      this.state.manualColors,
    );
    this.scales.registerValue(schemeName, scale);
    return scale;
  }
}
