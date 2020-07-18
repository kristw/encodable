import { LabelOverlapStrategy, LabelOverlapType, ChannelType } from '../types';

import { isX } from '../typeGuards/Channel';

export const STRATEGY_FLAT = { strategy: 'flat' } as const;
const STRATEGY_ROTATE = { labelAngle: 40, strategy: 'rotate' } as const;

export default function expandLabelOverlapStrategy(
  channelType: ChannelType,
  labelOverlap: LabelOverlapType = 'auto',
): LabelOverlapStrategy {
  let output: LabelOverlapStrategy;
  switch (labelOverlap) {
    case 'flat':
      output = STRATEGY_FLAT;
      break;
    case 'rotate':
      output = STRATEGY_ROTATE;
      break;
    case 'auto':
      output = isX(channelType) ? STRATEGY_ROTATE : STRATEGY_FLAT;
      break;
    default:
      output = labelOverlap;
      break;
  }

  return { ...output };
}
