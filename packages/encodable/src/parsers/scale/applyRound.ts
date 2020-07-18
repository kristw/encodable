import { interpolateRound } from 'd3-interpolate';
import { ScalePoint, ScaleBand, ScaleSymLog } from 'd3-scale';
import { Value } from '../../types';
import { D3Scale, ContinuousD3Scale } from '../../types/scale/Scale';
import { StringLike } from '../../types/internal/Base';
import { ScaleConfig } from '../../types/scale/ScaleConfig';

export default function applyRound<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('round' in config && config.round === true) {
    const roundableScale = scale as
      | Exclude<ContinuousD3Scale<number>, ScaleSymLog<number, number>>
      | ScalePoint<StringLike>
      | ScaleBand<StringLike>;
    if ('round' in roundableScale) {
      roundableScale.round(config.round);
    } else {
      roundableScale.interpolate(interpolateRound);
    }
  }
}
