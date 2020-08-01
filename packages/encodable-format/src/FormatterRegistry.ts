import { SyncRegistry, OverwritePolicy, RegistryConfig } from '@encodable/registry';

export default abstract class FormatterRegistry<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Formatter extends (v: any) => string
> extends SyncRegistry<Formatter> {
  constructor({ overwritePolicy = OverwritePolicy.WARN, ...rest }: RegistryConfig) {
    super({
      overwritePolicy,
      ...rest,
    });
  }

  /**
   * Subclasses must implement this to create formatter from format string.
   * Worst-case can return `fallbackFormatter`.
   */
  protected abstract createFormatter(format: string): Formatter;

  /**
   * Get a Formatter by name
   * @param format Formatter name, usually is a format string
   */
  get(format?: string) {
    const targetFormat = `${
      format === null || typeof format === 'undefined' || format.trim().length === 0
        ? this.getDefaultKey()
        : format
    }`.trim();

    if (this.has(targetFormat)) {
      return super.get(targetFormat) as Formatter;
    }

    // Create new formatter if does not exist
    const formatter = this.createFormatter(targetFormat);
    this.registerValue(targetFormat, formatter);

    return formatter;
  }

  /**
   * Format value with the named Formatter
   * @param format Formatter name, usually is a format string
   * @param value value to be formatted
   */
  format(format: string | undefined, value: Parameters<Formatter>[0]): string {
    return this.get(format)(value);
  }
}
