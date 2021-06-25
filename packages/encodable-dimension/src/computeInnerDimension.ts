import { Padding } from './types';

export default function computeInnerDimension(
  width: number,
  height: number,
  { top, bottom, left, right }: Padding,
) {
  return {
    width: width - left - right,
    height: height - top - bottom,
  };
}
