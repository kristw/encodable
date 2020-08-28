import {
  CompleteChannelDef,
  CompleteValueDef,
  CompleteFieldDef,
} from '../types/internal/CompleteChannelDef';
import { DefaultOutput } from '../types/Core';

export function isCompleteValueDef<Output extends DefaultOutput = DefaultOutput>(
  def: CompleteChannelDef<Output>,
): def is CompleteValueDef<Output> {
  return 'value' in def;
}

export function isCompleteFieldDef<Output extends DefaultOutput = DefaultOutput>(
  def: CompleteChannelDef<Output>,
): def is CompleteFieldDef<Output> {
  return 'field' in def;
}
