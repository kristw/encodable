/* eslint-disable no-dupe-class-members */
import { scaleOrdinal } from 'd3-scale';
import ExtensibleFunction from '../models/ExtensibleFunction';
import { ScaleStore, ColorLookup, StringLike } from './types';
import stringifyAndTrim from '../utils/stringifyAndTrim';

// Use type augmentation to correct the fact that
// an instance of CategoricalScale is also a function

interface ScaleCategoricalColor {
  (x: StringLike): string;
}

class ScaleCategoricalColor extends ExtensibleFunction {
  store: ScaleStore;

  parentManualColors?: ColorLookup;

  /**
   * Constructor
   * @param {*} colors an array of colors
   * @param {*} parentmanualColors optional parameter that comes from parent
   * (usually CategoricalColorNamespace) and supersede this.manualColors
   */
  constructor(storeOrColors: ScaleStore | string[], parentmanualColors?: ColorLookup) {
    super((value: string) => this.getColor(value));

    if (Array.isArray(storeOrColors)) {
      this.store = {
        manualColors: {},
        scale: scaleOrdinal<StringLike, string>(storeOrColors),
      };
    } else {
      this.store = storeOrColors;
    }
    this.parentManualColors = parentmanualColors;
  }

  get colors() {
    return this.store.scale.range();
  }

  getColor(value?: string) {
    const cleanedValue = stringifyAndTrim(value);

    const parentColor = this.parentManualColors && this.parentManualColors[cleanedValue];
    if (parentColor) {
      return parentColor;
    }

    const manualColor = this.store.manualColors[cleanedValue];
    if (manualColor) {
      return manualColor;
    }

    return this.store.scale(cleanedValue);
  }

  /**
   * Enforce specific color for given value
   * @param {*} value value
   * @param {*} manualColor manualColor
   */
  setColor(value: string, manualColor: string) {
    this.store.manualColors[stringifyAndTrim(value)] = manualColor;

    return this;
  }

  /**
   * Get a mapping of data values to colors
   * @returns an object where the key is the data value and the value is the hex color code
   */
  getColorMap() {
    const colorMap: { [key: string]: string } = {};
    this.store.scale.domain().forEach(value => {
      colorMap[String(value)] = this.store.scale(value);
    });

    return {
      ...colorMap,
      ...this.store.manualColors,
      ...this.parentManualColors,
    };
  }

  /**
   * Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.
   */
  copy() {
    const copy = new ScaleCategoricalColor(
      {
        manualColors: { ...this.store.manualColors },
        scale: this.store.scale.copy(),
      },
      this.parentManualColors,
    );

    return copy;
  }

  /**
   * Returns the scale's current domain.
   */
  domain(): { toString(): string }[];

  /**
   * Expands the domain to include the specified array of values.
   */
  domain(newDomain: { toString(): string }[]): this;

  domain(newDomain?: { toString(): string }[]): unknown {
    if (typeof newDomain === 'undefined') {
      return this.store.scale.domain() as string[];
    }

    this.store.scale.domain(newDomain);
    return this;
  }

  /**
   * Returns the scale's current range.
   */
  range(): string[];

  /**
   * Sets the range of the ordinal scale to the specified array of values.
   *
   * The first element in the domain will be mapped to the first element in range, the second domain value to the second range value, and so on.
   *
   * If there are fewer elements in the range than in the domain, the scale will reuse values from the start of the range.
   *
   * @param range Array of range values.
   */
  range(newRange: string[]): this;

  range(newRange?: string[]): unknown {
    if (typeof newRange === 'undefined') {
      return this.store.scale.range();
    }

    this.store.scale.range(newRange);
    return this;
  }

  /**
   * Returns the current unknown value, which defaults to "implicit".
   */
  unknown(): string | { name: 'implicit' };

  /**
   * Sets the output value of the scale for unknown input values and returns this scale.
   * The implicit value enables implicit domain construction. scaleImplicit can be used as a convenience to set the implicit value.
   *
   * @param value Unknown value to be used or scaleImplicit to set implicit scale generation.
   */
  unknown(value: string | { name: 'implicit' }): this;

  unknown(value?: string | { name: 'implicit' }): unknown {
    if (typeof value === 'undefined') {
      return this.store.scale.unknown();
    }

    this.store.scale.unknown(value);
    return this;
  }
}

export default ScaleCategoricalColor;
