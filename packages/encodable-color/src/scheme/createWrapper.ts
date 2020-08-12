import { ColorScheme } from '../types';

export default function createWrapper<T extends ColorScheme>(scheme: T): T {
  return scheme;
}
