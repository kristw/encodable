import { ValueOf } from '../internal/Base';

// Modified from vega-lite
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
