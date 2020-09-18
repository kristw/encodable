import { MarginOrPadding } from './types';

function mergeSide(
  operation: (a: number, b: number) => number,
  a: number | null | undefined,
  b: number | null | undefined,
  defaultValue: number,
): number | undefined {
  const hasA = a != null && !Number.isNaN(a);
  const hasB = b != null && !Number.isNaN(b);

  if (hasA && hasB) {
    return operation(a, b);
  }
  if (hasA) {
    return a;
  }
  if (hasB) {
    return b;
  }
  return defaultValue;
}

function mergeMarginOrPadding(
  margin1: Partial<MarginOrPadding> = {},
  margin2: Partial<MarginOrPadding> = {},
  mode: 'max' | 'min' = 'max',
  defaultValue: number = 0,
) {
  const { top, left, bottom, right } = margin1;
  const operation = mode === 'max' ? Math.max : Math.min;

  return {
    top: mergeSide(operation, top, margin2.top, defaultValue),
    left: mergeSide(operation, left, margin2.left, defaultValue),
    bottom: mergeSide(operation, bottom, margin2.bottom, defaultValue),
    right: mergeSide(operation, right, margin2.right, defaultValue),
  };
}

export const mergePadding = mergeMarginOrPadding;
export const mergeMargin = mergeMarginOrPadding;
