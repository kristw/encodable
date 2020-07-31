import { NumberFormatter } from '../types';

export const PREVIEW_VALUE = 12345.432;

export default function previewNumber(format: NumberFormatter, value: number = PREVIEW_VALUE) {
  return `${value} => ${format(value)}`;
}
