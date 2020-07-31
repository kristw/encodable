import { makeSingleton } from '@encodable/registry';
import NumberFormatterRegistry from './NumberFormatterRegistry';

export const getNumberFormatterRegistry = makeSingleton(
  () =>
    new NumberFormatterRegistry({
      isGlobal: true,
      globalId: '@encodable/format:NumberFormatterRegistry',
    }),
);

export function getNumberFormatter(format?: string) {
  return getNumberFormatterRegistry().get(format);
}

export function formatNumber(format: string | undefined, value: number | null | undefined) {
  return getNumberFormatterRegistry().format(format, value);
}

export { NumberFormatterRegistry };
export { default as NumberFormats } from './NumberFormats';
export { default as createNumberFormatter } from './createNumberFormatter';
export { default as previewNumber } from './previewNumber';
export { default as createD3NumberFormatter } from './factories/createD3NumberFormatter';
export { default as createSmartNumberFormatter } from './factories/createSmartNumberFormatter';
