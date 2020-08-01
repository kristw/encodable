import { TimeFormatter } from '../types';

export const PREVIEW_TIME = new Date(Date.UTC(2017, 1, 14, 11, 22, 33));

export default function previewTime(format: TimeFormatter, value: Date = PREVIEW_TIME) {
  return `${value.toUTCString()} => ${format(value)}`;
}
