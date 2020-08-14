import {
  ScaleLinear,
  ScaleLogarithmic,
  ScalePower,
  ScaleTime,
  ScaleQuantile,
  ScaleQuantize,
  ScaleThreshold,
  ScaleOrdinal,
  ScalePoint,
  ScaleBand,
} from 'd3-scale';
import {
  ScaleType,
  Value,
  StringLike,
  AllScale,
  ScaleConfig,
  LinearScaleConfig,
  LogScaleConfig,
  PowScaleConfig,
  SqrtScaleConfig,
  SymlogScaleConfig,
  TimeScaleConfig,
  UtcScaleConfig,
  QuantileScaleConfig,
  QuantizeScaleConfig,
  ThresholdScaleConfig,
  BinOrdinalScaleConfig,
  OrdinalScaleConfig,
  PointScaleConfig,
  BandScaleConfig,
} from '../../types';

import createScaleFromScaleType from './createScaleFromScaleType';
import updateScale from './updateScale';
import EncodableOptions from '../../options/EncodableOptions';
import { isSchemeParams } from '../../typeGuards/SchemeParams';
import applyDomain from './applyDomain';

function createScaleFromScaleConfig<Output extends Value>(
  config: LinearScaleConfig<Output>,
): ScaleLinear<Output, Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: LogScaleConfig<Output> | SymlogScaleConfig<Output>,
): ScaleLogarithmic<Output, Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: PowScaleConfig<Output> | SqrtScaleConfig<Output>,
): ScalePower<Output, Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: TimeScaleConfig<Output> | UtcScaleConfig<Output>,
): ScaleTime<Output, Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: QuantileScaleConfig<Output>,
): ScaleQuantile<Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: QuantizeScaleConfig<Output>,
): ScaleQuantize<Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: ThresholdScaleConfig<Output>,
): ScaleThreshold<number | string | Date, Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: OrdinalScaleConfig<Output> | BinOrdinalScaleConfig<Output>,
): ScaleOrdinal<StringLike, Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: PointScaleConfig,
): ScalePoint<StringLike>;

function createScaleFromScaleConfig<Output extends Value>(
  config: BandScaleConfig,
): ScaleBand<StringLike>;

function createScaleFromScaleConfig<Output extends Value>(
  config: ScaleConfig<Output>,
): AllScale<Output>;

function createScaleFromScaleConfig<Output extends Value>(config: ScaleConfig<Output>) {
  const { range } = config;

  // Handle categorical color scales
  // An ordinal scale without specified range
  // is assumed to be a color scale.
  if (config.type === ScaleType.ORDINAL && typeof range === 'undefined') {
    const scheme = 'scheme' in config ? config.scheme : undefined;
    const resolve = EncodableOptions.getCategoricalColorScaleResolver();

    let colorScale: ScaleOrdinal<StringLike, string>;
    if (typeof scheme === 'undefined') {
      colorScale = resolve({});
    } else if (isSchemeParams(scheme)) {
      colorScale = resolve(scheme);
    } else {
      colorScale = resolve({ name: scheme });
    }

    const castedColorScale = (colorScale as unknown) as ScaleOrdinal<StringLike, Output>;
    applyDomain(config, castedColorScale);

    return castedColorScale;
  }

  const scale = createScaleFromScaleType<Output>(config.type);

  return updateScale(scale, config);
}

export default createScaleFromScaleConfig;
