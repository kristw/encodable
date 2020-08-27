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
  DefaultOutput,
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
  OrdinalScaleConfig,
  PointScaleConfig,
  BandScaleConfig,
  DefaultThresholdInput,
} from '../../types';

import createScaleFromScaleType from './createScaleFromScaleType';
import updateScale from './updateScale';
import Encodable from '../../options/Encodable';
import { isSchemeParams } from '../../typeGuards/SchemeParams';
import applyDomain from './applyDomain';

function createScale<Output extends DefaultOutput>(
  config: LinearScaleConfig<Output>,
): ScaleLinear<Output, Output>;

function createScale<Output extends DefaultOutput>(
  config: LogScaleConfig<Output> | SymlogScaleConfig<Output>,
): ScaleLogarithmic<Output, Output>;

function createScale<Output extends DefaultOutput>(
  config: PowScaleConfig<Output> | SqrtScaleConfig<Output>,
): ScalePower<Output, Output>;

function createScale<Output extends DefaultOutput>(
  config: TimeScaleConfig<Output> | UtcScaleConfig<Output>,
): ScaleTime<Output, Output>;

function createScale<Output extends DefaultOutput>(
  config: QuantileScaleConfig<Output>,
): ScaleQuantile<Output>;

function createScale<Output extends DefaultOutput>(
  config: QuantizeScaleConfig<Output>,
): ScaleQuantize<Output>;

function createScale<Output extends DefaultOutput>(
  config: ThresholdScaleConfig<DefaultThresholdInput, Output>,
): ScaleThreshold<number | string | Date, Output>;

function createScale<Output extends DefaultOutput>(
  config: OrdinalScaleConfig<StringLike, Output>, // | BinOrdinalScaleConfig<Output>,
): ScaleOrdinal<StringLike, Output>;

function createScale<Output extends DefaultOutput>(
  config: PointScaleConfig,
): ScalePoint<StringLike>;

function createScale<Output extends DefaultOutput>(config: BandScaleConfig): ScaleBand<StringLike>;

function createScale<Output extends DefaultOutput>(config: ScaleConfig<Output>): AllScale<Output>;

function createScale<Output extends DefaultOutput>(config: ScaleConfig<Output>) {
  const { range } = config;

  // Handle categorical color scales
  // An ordinal scale without specified range
  // is assumed to be a color scale.
  if (config.type === ScaleType.ORDINAL && typeof range === 'undefined') {
    const scheme = 'scheme' in config ? config.scheme : undefined;
    const resolve = Encodable.getCategoricalColorScaleResolver();

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

export default createScale;
