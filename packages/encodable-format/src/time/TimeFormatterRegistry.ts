import { SyncRegistry, OverwritePolicy, RegistryConfig } from '@encodable/registry';
import TimeFormats, { LOCAL_TIME_PREFIX } from './TimeFormats';
import createD3TimeFormatter from './factories/createD3TimeFormatter';
import { TimeFormatter } from '../types';
import { removePrefix } from '../utils/prefix';

export default class TimeFormatterRegistry extends SyncRegistry<TimeFormatter> {
  constructor({
    defaultKey = TimeFormats.DATABASE_DATETIME,
    name = 'TimeFormatter',
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
      return super.get(targetFormat) as TimeFormatter;
    }

    // Create new formatter if does not exist
    const formatter = createD3TimeFormatter({
      format: removePrefix(LOCAL_TIME_PREFIX, targetFormat),
      useLocalTime: targetFormat.startsWith(LOCAL_TIME_PREFIX),
    });
    this.registerValue(targetFormat, formatter);

    return formatter;
  }

  format(format: string | undefined, value: Date | null | undefined): string {
    return this.get(format)(value);
  }
}
