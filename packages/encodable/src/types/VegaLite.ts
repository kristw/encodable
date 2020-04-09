import { ValueOf } from './Base';

// Types imported from vega-lite
export { isDateTime, DateTime } from 'vega-lite/build/src/datetime';
export { SchemeParams, Scale, NiceTime } from 'vega-lite/build/src/scale';
export { Axis } from 'vega-lite/build/src/axis';
export { Type } from 'vega-lite/build/src/type';

/** Same with vega-lite's Value */
export type Value = number | string | boolean | null;

/**
 * Override vega-lite's ValueDef which also supports Gradient
 * Definition object for a constant value (primitive value or gradient definition) of an encoding channel.
 */
export interface ValueDef<V extends Value | Value[] = Value> {
  /**
   * A constant value in visual domain (e.g., `"red"` / `"#0099ff"` / [gradient definition](https://vega.github.io/vega-lite/docs/types.html#gradient) for color, values between `0` to `1` for opacity).
   */
  value: V;
}

// Override this implementation
// because vega-lite uses namespace which has issues with babel and typescript
export const ScaleType = {
  // Continuous - Quantitative
  LINEAR: 'linear',
  LOG: 'log',
  POW: 'pow',
  SQRT: 'sqrt',
  SYMLOG: 'symlog',

  // Continuous - Time
  TIME: 'time',
  UTC: 'utc',

  // Discretizing scales
  QUANTILE: 'quantile',
  QUANTIZE: 'quantize',
  THRESHOLD: 'threshold',
  BIN_ORDINAL: 'bin-ordinal',

  // Discrete scales
  ORDINAL: 'ordinal',
  POINT: 'point',
  BAND: 'band',
} as const;

export type ScaleType = ValueOf<typeof ScaleType>;
