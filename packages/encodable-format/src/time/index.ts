import { makeSingleton } from '@encodable/registry';
import TimeFormatterRegistry from './TimeFormatterRegistry';

export const getTimeFormatterRegistry = makeSingleton(
  () =>
    new TimeFormatterRegistry({
      isGlobal: true,
      globalId: '@encodable/format:TimeFormatterRegistry',
    }),
);

export function getTimeFormatter(format?: string) {
  return getTimeFormatterRegistry().get(format);
}

export function formatTime(format: string | undefined, value: Date | null | undefined) {
  return getTimeFormatterRegistry().format(format, value);
}

export { TimeFormatterRegistry };
export { default as TimeFormats, LOCAL_TIME_PREFIX } from './TimeFormats';
export { default as createTimeFormatter } from './createTimeFormatter';
export { default as previewTime } from './previewTime';
export { default as createD3TimeFormatter } from './factories/createD3TimeFormatter';
export { default as createMultiFormatter } from './factories/createMultiFormatter';
export { default as smartDateFormatter } from './formatters/smartDate';
export { default as smartDateVerboseFormatter } from './formatters/smartDateVerbose';
