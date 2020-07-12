import get from 'lodash/get';
import { ChannelDef } from '../types/ChannelDef';
import { isValueDef } from '../typeGuards/ChannelDef';
import { PlainObject } from '../types/Data';
import { Value } from '../types/VegaLite';
import { ChannelInput } from '../types/Channel';

export type Getter<Output extends Value> = (x?: PlainObject) => ChannelInput | Output | undefined;

export default function createGetterFromChannelDef<Output extends Value>(
  definition: ChannelDef<Output>,
): Getter<Output> {
  if (isValueDef(definition)) {
    return () => definition.value;
  }
  if (typeof definition.field !== 'undefined') {
    return (x?: PlainObject) => get(x, definition.field);
  }

  return () => undefined;
}
