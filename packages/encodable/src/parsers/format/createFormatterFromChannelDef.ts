import { ChannelDef } from '../../types/ChannelDef';
import { isFieldDef } from '../../typeGuards/ChannelDef';
import fallbackFormatter from './fallbackFormatter';
import createFormatterFromFieldTypeAndFormat from './createFormatterFromFieldTypeAndFormat';

export default function createFormatterFromChannelDef(definition: ChannelDef) {
  return isFieldDef(definition)
    ? createFormatterFromFieldTypeAndFormat(definition)
    : fallbackFormatter;
}
