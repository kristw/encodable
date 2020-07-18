import {
  scaleLinear,
  scaleLog,
  scalePow,
  scaleSqrt,
  scaleTime,
  scaleUtc,
  scaleQuantile,
  scaleQuantize,
  scaleThreshold,
  scaleOrdinal,
  scalePoint,
  scaleBand,
  scaleSymlog,
} from 'd3-scale';
import { StringLike, ScaleType, Value } from '../../types';

export default function createScaleFromScaleType<Output extends Value>(type: ScaleType) {
  switch (type) {
    case ScaleType.LINEAR:
      return scaleLinear<Output>();
    case ScaleType.LOG:
      return scaleLog<Output>();
    case ScaleType.POW:
      return scalePow<Output>();
    case ScaleType.SQRT:
      return scaleSqrt<Output>();
    case ScaleType.TIME:
      return scaleTime<Output>();
    case ScaleType.UTC:
      return scaleUtc<Output>();
    case ScaleType.QUANTILE:
      return scaleQuantile<Output>();
    case ScaleType.QUANTIZE:
      return scaleQuantize<Output>();
    case ScaleType.THRESHOLD:
      return scaleThreshold<number | string | Date, Output>();
    case ScaleType.ORDINAL:
      return scaleOrdinal<StringLike, Output>();
    case ScaleType.POINT:
      return scalePoint<StringLike>();
    case ScaleType.BAND:
      return scaleBand<StringLike>();
    case ScaleType.SYMLOG:
      return scaleSymlog<Output, Output>();
    case ScaleType.BIN_ORDINAL:
      // TODO: Pending scale.bins implementation
      throw new Error(`"type = ${type}" is not supported yet.`);
    default:
      return scaleLinear<Output>();
  }
}
