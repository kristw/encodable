import { ChannelDef, ChannelType, Value } from '../types';
import { CompleteChannelDef } from '../types/internal/CompleteChannelDef';
import { isFieldDef, isValueDef, isTypedFieldDef } from '../typeGuards/ChannelDef';
import completeAxisConfig from './completeAxisConfig';
import completeFormatConfig from './completeFormatConfig';
import completeLegendConfig from './completeLegendConfig';
import completeScaleConfig from './completeScaleConfig';
import inferFieldType from './inferFieldType';

export default function completeChannelDef<Output extends Value>(
  channelType: ChannelType,
  channelDef: ChannelDef<Output>,
): CompleteChannelDef<Output> {
  if (isValueDef(channelDef)) {
    return {
      ...channelDef,
      axis: false,
      legend: false,
      scale: false,
      title: '',
    };
  }

  // Fill top-level properties
  const copy = {
    ...channelDef,
    title: isFieldDef(channelDef) ? channelDef.title ?? channelDef.field : '',
    type: isTypedFieldDef(channelDef)
      ? channelDef.type
      : inferFieldType(channelType, channelDef.field),
  };

  // Scale needs the top-level properties to be filled.
  const scale = completeScaleConfig(channelType, copy);
  // Format needs scale.
  const format = completeFormatConfig({ ...channelDef, scaleType: scale ? scale.type : undefined });
  const copy2 = { ...copy, ...format, scale };

  // These need scale and format
  const axis = completeAxisConfig(channelType, copy2);
  const legend = completeLegendConfig(channelType, copy2);

  return {
    ...copy2,
    axis,
    legend,
  };
}
