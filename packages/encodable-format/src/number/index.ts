import NumberFormatterRegistry from './NumberFormatterRegistry';

let singleton: NumberFormatterRegistry | undefined;

export function getNumberFormatterRegistry() {
  if (typeof singleton === 'undefined') {
    singleton = new NumberFormatterRegistry({
      isGlobal: true,
      registryId: '@encodable/format:NumberFormatterRegistry',
    });
  }
  return singleton;
}

export function getNumberFormatter(format?: string) {
  return getNumberFormatterRegistry().get(format);
}

export function formatNumber(format: string | undefined, value: number | null | undefined) {
  return getNumberFormatterRegistry().format(format, value);
}

export { default as NumberFormats } from './NumberFormats';
export { default as createNumberFormatter } from './createNumberFormatter';
export { default as previewNumber } from './previewNumber';
export { default as createD3NumberFormatter } from './factories/createD3NumberFormatter';
export { default as createSmartNumberFormatter } from './factories/createSmartNumberFormatter';
