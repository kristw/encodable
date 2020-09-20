import { MarginOrPadding } from './types';

function isNumber(x: number | null | undefined): x is number {
  return x != null && !Number.isNaN(x);
}

function mergeSide(
  operation: (a: number, b: number) => number,
  a: number | null | undefined,
  b: number | null | undefined,
  defaultValue: number,
): number {
  if (isNumber(a)) {
    return isNumber(b) ? operation(a, b) : a;
  }
  return isNumber(b) ? b : defaultValue;
}

function mergeMarginOrPadding(
  margin1: Partial<MarginOrPadding> = {},
  margin2: Partial<MarginOrPadding> = {},
  mode: 'max' | 'min' = 'max',
  defaultValue: number = 0,
): MarginOrPadding {
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
