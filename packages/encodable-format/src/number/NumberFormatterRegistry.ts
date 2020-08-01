import { SyncRegistry, OverwritePolicy, RegistryConfig } from '@encodable/registry';
import createD3NumberFormatter from './factories/createD3NumberFormatter';
import createSmartNumberFormatter from './factories/createSmartNumberFormatter';
import Formats from './NumberFormats';
import { NumberFormatter } from '../types';

export default class NumberFormatterRegistry extends SyncRegistry<NumberFormatter> {
  constructor({
    name = 'NumberFormatter',
    overwritePolicy = OverwritePolicy.WARN,
    ...rest
  }: RegistryConfig = {}) {
    super({
      name,
      overwritePolicy,
      ...rest,
    });

    this.registerValue(Formats.SMART_NUMBER, createSmartNumberFormatter());
    this.registerValue(Formats.signed.SMART_NUMBER, createSmartNumberFormatter({ signed: true }));
    this.setDefaultKey(Formats.SMART_NUMBER);
  }

  get(formatterId?: string) {
    const targetFormat = `${
      formatterId === null || typeof formatterId === 'undefined' || formatterId === ''
        ? this.getDefaultKey()
        : formatterId
    }`.trim();

    if (this.has(targetFormat)) {
      return super.get(targetFormat) as NumberFormatter;
    }

    // Create new formatter if does not exist
    const formatter = createD3NumberFormatter({
      format: targetFormat,
    });
    this.registerValue(targetFormat, formatter);

    return formatter;
  }

  format(formatterId: string | undefined, value: number | null | undefined): string {
    return this.get(formatterId)(value);
  }
}
