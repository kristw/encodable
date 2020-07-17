import { interpolateRound } from 'd3-interpolate';
import { ScalePoint, ScaleBand } from 'd3-scale';
import { Value } from '../../types/VegaLite';
import { D3Scale, ContinuousD3Scale } from '../../types/Scale';
import { HasToString } from '../../types/Base';
import { ScaleConfig } from '../../types/ScaleConfig';

export default function applyRound<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if ('round' in config && config.round === true) {
    const roundableScale = scale as
      | ContinuousD3Scale<number>
      | ScalePoint<HasToString>
      | ScaleBand<HasToString>;
    if ('round' in roundableScale) {
      roundableScale.round(config.round);
    } else if ('interpolate' in roundableScale) {
      roundableScale.interpolate(interpolateRound);
    }
  }
}
