// Same with vega-lite version
/** Possible values */
export type Value = number | string | boolean | null;

// Override: exclude gradient type
/**
 * Definition object for a constant value of an encoding channel.
 */
export interface ValueDef<V extends Value | Value[] = Value> {
  /**
   * A constant value in visual domain (e.g., `"red"` / `"#0099ff"` / [gradient definition](https://vega.github.io/vega-lite/docs/types.html#gradient) for color, values between `0` to `1` for opacity).
   */
  value: V;
}

// Override: exclude geojson type
/** field type */
export type Type = 'quantitative' | 'ordinal' | 'temporal' | 'nominal';

export * from './Axis';
export * from './DateTime';
export * from './Mixins';
export * from './ScaleType';
export * from './SchemeParams';
