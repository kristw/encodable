import { SchemeParams } from '../types';

// eslint-disable-next-line import/prefer-default-export
export function isSchemeParams(scheme: string | SchemeParams): scheme is SchemeParams {
  return Object.prototype.toString.call(scheme) !== '[object String]';
}
