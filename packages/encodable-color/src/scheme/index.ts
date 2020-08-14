import { makeSingleton } from '@encodable/registry';
import ColorSchemeRegistry from './ColorSchemeRegistry';
import { d3Schemes } from './presets/d3Schemes';

export const getColorSchemeRegistry = makeSingleton(() =>
  new ColorSchemeRegistry({
    globalId: '@encodable/color:ColorSchemeRegistry',
  }).register(d3Schemes),
);

export function getColorScheme(schemeId?: string) {
  return getColorSchemeRegistry().get(schemeId);
}

export function getCategoricalScheme(schemeId?: string) {
  return getColorSchemeRegistry().categorical.get(schemeId);
}

export function getSequentialScheme(schemeId?: string) {
  return getColorSchemeRegistry().sequential.get(schemeId);
}

export function getDivergingScheme(schemeId?: string) {
  return getColorSchemeRegistry().diverging.get(schemeId);
}

export { ColorSchemeRegistry };
export { default as wrapColorScheme } from './wrappers/wrapColorScheme';
export * from './presets/d3Schemes';
