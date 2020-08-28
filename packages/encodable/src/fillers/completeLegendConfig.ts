import { DefaultOutput, Legend, ChannelType, ChannelDef } from '../types';
import { isXOrY } from '../typeGuards/Channel';

export type CompleteLegendConfig = false | Legend;

export default function completeLegendConfig<Output extends DefaultOutput = DefaultOutput>(
  channelType: ChannelType,
  channelDef: ChannelDef<Output>,
): CompleteLegendConfig {
  if ('legend' in channelDef && channelDef.legend !== undefined) {
    return channelDef.legend;
  }

  return isXOrY(channelType) || channelType === 'Text' ? false : {};
}
