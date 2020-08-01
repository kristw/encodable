import { SyncRegistry, OverwritePolicy, RegistryConfig } from '@encodable/registry';
import TimeFormats from '../time/TimeFormats';
import { TimeRangeFormatter, TimeFormatInput } from '../types';
import createNaiveTimeRangeFormatter from './factories/createNaiveTimeRangeFormatter';

export default class TimeRangeFormatterRegistry extends SyncRegistry<TimeRangeFormatter> {
  constructor({
    defaultKey = TimeFormats.DATABASE_DATETIME,
    name = 'TimeRangeFormatter',
    overwritePolicy = OverwritePolicy.WARN,
    ...rest
  }: RegistryConfig = {}) {
    super({
      defaultKey,
      name,
      overwritePolicy,
      ...rest,
    });
  }

  get(format?: string) {
    const targetFormat = `${
      format === null || typeof format === 'undefined' || format === ''
        ? this.getDefaultKey()
        : format
    }`.trim();

    if (this.has(targetFormat)) {
      return super.get(targetFormat) as TimeRangeFormatter;
    }

    // Create new formatter if does not exist
    const formatter = createNaiveTimeRangeFormatter({
      format: targetFormat,
    });
    this.registerValue(targetFormat, formatter);

    return formatter;
  }

  format(format: string | undefined, value: TimeFormatInput[]): string {
    return this.get(format)(value);
  }
}
