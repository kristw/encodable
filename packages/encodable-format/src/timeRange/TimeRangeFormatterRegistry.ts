import { RegistryConfig } from '@encodable/registry';
import TimeFormats from '../time/TimeFormats';
import { TimeRangeFormatter } from '../types';
import createNaiveTimeRangeFormatter from './factories/createNaiveTimeRangeFormatter';
import FormatterRegistry from '../FormatterRegistry';

export default class TimeRangeFormatterRegistry extends FormatterRegistry<TimeRangeFormatter> {
  constructor({
    defaultKey = TimeFormats.DATABASE_DATETIME,
    name = 'TimeRangeFormatter',
    ...rest
  }: RegistryConfig = {}) {
    super({ defaultKey, name, ...rest });
  }

  // eslint-disable-next-line class-methods-use-this
  protected createFormatter(format: string) {
    return createNaiveTimeRangeFormatter({ format });
  }
}
