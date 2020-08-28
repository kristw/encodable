import get from 'lodash.get';
import { isValueDef } from '../typeGuards/ChannelDef';
import { DefaultOutput, ChannelInput, ChannelDef, PlainObject } from '../types';

export type Getter = (x?: PlainObject) => ChannelInput | undefined;

export default function createGetterFromChannelDef<Output extends DefaultOutput>(
  definition: ChannelDef<Output>,
): Getter {
  if (isValueDef(definition)) {
    return () => definition.value;
  }
  if (typeof definition.field !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (x?: PlainObject) => get(x, definition.field);
  }

  return () => undefined;
}
