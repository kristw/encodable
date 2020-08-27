import get from 'lodash.get';
import { isValueDef } from '../typeGuards/ChannelDef';
import { DefaultOutput, ChannelInput, ChannelDef, PlainObject } from '../types';

export type Getter<Output extends DefaultOutput> = (
  x?: PlainObject,
) => ChannelInput | Output | undefined;

export default function createGetterFromChannelDef<Output extends DefaultOutput>(
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
