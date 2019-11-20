import { ChannelDef } from '../types/ChannelDef';
import { ChannelType } from '../types/Channel';
import { isFieldDef, isValueDef, isTypedFieldDef } from '../typeGuards/ChannelDef';
import completeAxisConfig from './completeAxisConfig';
import completeLegendConfig from './completeLegendConfig';
import completeScaleConfig from './completeScaleConfig';
import { Value } from '../types/VegaLite';
import inferFieldType from './inferFieldType';
import { CompleteChannelDef } from '../types/CompleteChannelDef';

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
    title: isFieldDef(channelDef) ? channelDef.title || channelDef.field : '',
    type: isTypedFieldDef(channelDef)
      ? channelDef.type
      : inferFieldType(channelType, channelDef.field),
  };

  return {
    ...copy,
    axis: completeAxisConfig(channelType, copy),
    legend: completeLegendConfig(channelType, copy),
    scale: completeScaleConfig(channelType, copy),
  };
}
