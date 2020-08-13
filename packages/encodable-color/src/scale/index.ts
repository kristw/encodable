import { makeSingleton } from '@encodable/registry';
import ColorNamespaceRegistry from './ColorNamespaceRegistry';
import stringifyAndTrim from '../utils/stringifyAndTrim';

export const getColorNamespaceRegistry = makeSingleton(
  () =>
    new ColorNamespaceRegistry({
      globalId: '@encodable/color:ColorNamespaceRegistry',
    }),
);

export function getColorNamespace(namespace?: string) {
  return getColorNamespaceRegistry().get(namespace);
}

export function getScale(scheme?: string, namespace?: string) {
  return getColorNamespaceRegistry().get(namespace).getScale(scheme);
}

export function getColor(value?: string, scheme?: string, namespace?: string) {
  return getColorNamespaceRegistry().get(namespace).getScale(scheme)!(stringifyAndTrim(value));
}

export { ColorNamespaceRegistry };
