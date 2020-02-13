import { ValueOf } from './Base';

// Types imported from vega-lite
export { ValueDef, Value } from 'vega-lite/build/src/channeldef';
export { isDateTime, DateTime } from 'vega-lite/build/src/datetime';
export { SchemeParams, Scale, NiceTime } from 'vega-lite/build/src/scale';
export { Axis } from 'vega-lite/build/src/axis';
export { Type } from 'vega-lite/build/src/type';

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
