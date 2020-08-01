import { RegistryConfig } from '@encodable/registry';
import createD3NumberFormatter from './factories/createD3NumberFormatter';
import createSmartNumberFormatter from './factories/createSmartNumberFormatter';
import Formats from './NumberFormats';
import { NumberFormatter } from '../types';
import FormatterRegistry from '../FormatterRegistry';

export default class NumberFormatterRegistry extends FormatterRegistry<NumberFormatter> {
  constructor({ name = 'NumberFormatter', ...rest }: RegistryConfig = {}) {
    super({ name, ...rest });

    this.registerValue(Formats.SMART_NUMBER, createSmartNumberFormatter());
    this.registerValue(Formats.signed.SMART_NUMBER, createSmartNumberFormatter({ signed: true }));
    this.setDefaultKey(Formats.SMART_NUMBER);
  }

  // eslint-disable-next-line class-methods-use-this
  protected createFormatter(format: string) {
    return createD3NumberFormatter({ format });
  }
}
