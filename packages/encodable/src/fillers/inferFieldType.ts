import { ChannelType, Type } from '../types';
import { isXOrY } from '../typeGuards/Channel';

const temporalFieldNames = new Set(['time', 'date', 'datetime', 'timestamp']);

export default function inferFieldType(channelType: ChannelType, field: string = ''): Type {
  if (isXOrY(channelType) || channelType === 'Numeric') {
    return temporalFieldNames.has(field.toLowerCase()) ? 'temporal' : 'quantitative';
  }

  return 'nominal';
}
