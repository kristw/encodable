import { CategoricalColorNamespace, CategoricalColorScale } from '@superset-ui/color';
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
import { ScaleType, Value } from '../../types/VegaLite';
import {
  ScaleConfig,
  CategoricalScaleInput,
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
  AllScale,
} from '../../types/Scale';
import createScaleFromScaleType from './createScaleFromScaleType';
import applyNice from './applyNice';
import applyZero from './applyZero';
import applyInterpolate from './applyInterpolate';
import applyRound from './applyRound';
import applyDomain from './applyDomain';
import applyRange from './applyRange';
import applyPadding from './applyPadding';
import applyAlign from './applyAlign';
import applyClamp from './applyClamp';

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
  config: BinOrdinalScaleConfig<Output>,
): ScaleOrdinal<CategoricalScaleInput, Output>;

function createScaleFromScaleConfig<Output extends Value>(
  config: OrdinalScaleConfig<Output>,
): ScaleOrdinal<CategoricalScaleInput, Output> | CategoricalColorScale;

function createScaleFromScaleConfig<Output extends Value>(
  config: PointScaleConfig<Output>,
): ScalePoint<CategoricalScaleInput>;

function createScaleFromScaleConfig<Output extends Value>(
  config: BandScaleConfig<Output>,
): ScaleBand<CategoricalScaleInput>;

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
    const namespace = 'namespace' in config ? config.namespace : undefined;
    const colorScale = CategoricalColorNamespace.getScale(scheme, namespace);

    applyDomain(config, (colorScale as unknown) as ScaleOrdinal<CategoricalScaleInput, Output>);

    return colorScale;
  }

  const scale = createScaleFromScaleType(config);
  // domain and range apply to all scales
  applyDomain(config, scale);
  applyRange(config, scale);
  // Sort other properties alphabetically.
  applyAlign(config, scale);
  applyClamp(config, scale);
  applyInterpolate(config, scale);
  applyNice(config, scale);
  applyPadding(config, scale);
  applyRound(config, scale);
  applyZero(config, scale);

  return scale;
}

export default createScaleFromScaleConfig;
