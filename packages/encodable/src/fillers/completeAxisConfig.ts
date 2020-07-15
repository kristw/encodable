import isEnabled from '../utils/isEnabled';
import { isTypedFieldDef } from '../typeGuards/ChannelDef';
import { RequiredSome } from '../types/Base';
import { ChannelDef, PositionFieldDef } from '../types/ChannelDef';
import { ChannelType } from '../types/Channel';
import { isXOrY, isX } from '../typeGuards/Channel';
import { AxisConfig, LabelOverlapStrategy } from '../types/Axis';
import expandLabelOverlapStrategy from './expandLabelOverlapStrategy';
import { CompleteScaleConfig } from './completeScaleConfig';
import { HalfCompleteChannelDef } from '../types/CompleteChannelDef';
import { continuousToContinuousScaleTypesSet } from '../parsers/scale/scaleCategories';

type PositionFieldDefWithCompleteScaleConfig = Omit<PositionFieldDef, 'scale'> & {
  scale: CompleteScaleConfig;
};

function isChannelDefWithAxisSupport(
  channelType: ChannelType,
  channelDef: ChannelDef,
): channelDef is PositionFieldDefWithCompleteScaleConfig {
  return isTypedFieldDef(channelDef) && isXOrY(channelType);
}

export type CompleteAxisConfig =
  | false
  | (RequiredSome<
      Omit<AxisConfig, 'labelOverlap'>,
      | 'labelAngle'
      | 'labelFlush'
      | 'labelPadding'
      | 'orient'
      | 'tickCount'
      | 'ticks'
      | 'title'
      | 'titlePadding'
    > & {
      labelOverlap: LabelOverlapStrategy;
    });

export default function completeAxisConfig(
  channelType: ChannelType,
  channelDef: HalfCompleteChannelDef,
): CompleteAxisConfig {
  if (isChannelDefWithAxisSupport(channelType, channelDef) && isEnabled(channelDef.axis)) {
    const axis =
      channelDef.axis === true || typeof channelDef.axis === 'undefined' ? {} : channelDef.axis;

    const isXChannel = isX(channelType);

    const {
      format = channelDef.format,
      formatType = channelDef.formatType,
      formatInLocalTime = channelDef.formatInLocalTime,
      labelAngle = 0,
      labelFlush,
      labelOverlap,
      labelPadding = 4,
      orient = isXChannel ? 'bottom' : 'left',
      tickCount = 5,
      ticks = true,
      title = channelDef.title!,
      titlePadding = 4,
    } = axis;

    const output = {
      ...axis,
      format,
      formatType,
      labelAngle,
      labelFlush:
        typeof labelFlush === 'undefined'
          ? channelDef.scale &&
            typeof channelDef.scale.type !== 'undefined' &&
            continuousToContinuousScaleTypesSet.has(channelDef.scale.type)
          : labelFlush,
      labelOverlap: expandLabelOverlapStrategy(channelType, labelOverlap),
      labelPadding,
      orient,
      tickCount,
      ticks,
      title,
      titlePadding,
    };

    if (typeof formatInLocalTime !== 'undefined') {
      output.formatInLocalTime = formatInLocalTime;
    }

    return output;
  }

  return false as const;
}
