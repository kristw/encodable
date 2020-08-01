import { RegistryConfig } from '@encodable/registry';
import TimeFormats, { LOCAL_TIME_PREFIX } from './TimeFormats';
import createD3TimeFormatter from './factories/createD3TimeFormatter';
import { TimeFormatter } from '../types';
import { removePrefix } from '../utils/prefix';
import FormatterRegistry from '../FormatterRegistry';

export default class TimeFormatterRegistry extends FormatterRegistry<TimeFormatter> {
  constructor({
    defaultKey = TimeFormats.DATABASE_DATETIME,
    name = 'TimeFormatter',
    ...rest
  }: RegistryConfig = {}) {
    super({ defaultKey, name, ...rest });
  }

  // eslint-disable-next-line class-methods-use-this
  protected createFormatter(format: string) {
    return createD3TimeFormatter({
      format: removePrefix(LOCAL_TIME_PREFIX, format),
      useLocalTime: format.startsWith(LOCAL_TIME_PREFIX),
    });
  }
}
