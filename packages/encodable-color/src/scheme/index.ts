import { makeSingleton } from '@encodable/registry';
import ColorSchemeRegistry from './ColorSchemeRegistry';
import wrapColorScheme from './wrappers/wrapColorScheme';

export const getColorSchemeRegistry = makeSingleton(
  () =>
    new ColorSchemeRegistry({
      globalId: '@encodable/color:ColorSchemeRegistry',
    }),
);

export function getColorScheme(key?: string) {
  return getColorSchemeRegistry().get(key);
}

export function getCategoricalScheme(key?: string) {
  return getColorSchemeRegistry().categorical.get(key);
}

export function getSequentialScheme(key?: string) {
  return getColorSchemeRegistry().sequential.get(key);
}

export function getDivergingScheme(key?: string) {
  return getColorSchemeRegistry().diverging.get(key);
}

export { ColorSchemeRegistry, wrapColorScheme };
