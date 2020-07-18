import { ScaleType } from '../../types/VegaLite';
import {
  allScaleTypesSet,
  allScaleTypes,
  continuousDomainScaleTypes,
  continuousScaleTypes,
  continuousScaleTypesSet,
} from './scaleCategories';
import { ExtendedBaseScaleConfig } from '../../types/ScaleConfig';

const pointOrBand: ScaleType[] = [ScaleType.POINT, ScaleType.BAND];
const pointOrBandSet = new Set(pointOrBand);
const exceptPointOrBand = allScaleTypes.filter(type => !pointOrBandSet.has(type));
const exceptPointOrBandSet = new Set(exceptPointOrBand);
const continuousOrPointOrBandSet = new Set(continuousScaleTypes.concat(pointOrBand));

const zeroSet = new Set(continuousDomainScaleTypes);
// log scale cannot have zero value
zeroSet.delete(ScaleType.LOG);
// zero is not meaningful for time
zeroSet.delete(ScaleType.TIME);
zeroSet.delete(ScaleType.UTC);
// threshold requires custom domain so zero does not matter
zeroSet.delete(ScaleType.THRESHOLD);
// quantile depends on distribution so zero does not matter
zeroSet.delete(ScaleType.QUANTILE);

const supportedScaleTypes: Record<
  keyof ExtendedBaseScaleConfig<unknown, unknown, unknown>,
  Set<ScaleType>
> = {
  align: pointOrBandSet,
  base: new Set([ScaleType.LOG]),
  clamp: continuousScaleTypesSet,
  constant: new Set([ScaleType.SYMLOG]),
  domain: allScaleTypesSet,
  exponent: new Set([ScaleType.POW]),
  interpolate: exceptPointOrBandSet,
  nice: new Set(continuousScaleTypes.concat([ScaleType.QUANTIZE, ScaleType.THRESHOLD])),
  padding: continuousOrPointOrBandSet,
  paddingInner: new Set([ScaleType.BAND]),
  paddingOuter: pointOrBandSet,
  range: allScaleTypesSet,
  reverse: allScaleTypesSet,
  round: continuousOrPointOrBandSet,
  scheme: exceptPointOrBandSet,
  type: allScaleTypesSet,
  unknown: new Set([ScaleType.ORDINAL]),
  zero: zeroSet,
};

export default function isPropertySupportedByScaleType(
  property: keyof ExtendedBaseScaleConfig<unknown, unknown, unknown>,
  scaleType: ScaleType,
) {
  return supportedScaleTypes[property].has(scaleType);
}
