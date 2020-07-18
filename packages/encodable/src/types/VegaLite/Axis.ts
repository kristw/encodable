import { DateTime } from '../DateTime';
import { TitleMixins, FormatMixins } from '../Mixins';

interface Guide extends TitleMixins, FormatMixins {}

// Override: Flatten types from both vega and vega-lite
// only selected a small subset of fields
export interface Axis extends Guide {
  /**
   * The rotation angle of the axis labels.
   *
   * __Default value:__ `-90` for nominal and ordinal fields; `0` otherwise.
   *
   * @minimum -360
   * @maximum 360
   */
  labelAngle?: number;

  /**
   * Indicates if the first and last axis labels should be aligned flush with the scale range. Flush alignment for a horizontal axis will left-align the first label and right-align the last label. For vertical axes, bottom and top text baselines are applied instead. If this property is a number, it also indicates the number of pixels by which to offset the first and last labels; for example, a value of 2 will flush-align the first and last labels and also push them 2 pixels outward from the center of the axis. The additional adjustment can sometimes help the labels better visually group with corresponding axis ticks.
   *
   * __Default value:__ `true` for axis of a continuous x-scale. Otherwise, `false`.
   */
  labelFlush?: boolean | number;

  /**
   * Boolean value that determines whether the axis should include ticks.
   *
   * __Default value:__ `true`
   */
  ticks?: boolean;

  /**
   * A desired number of ticks, for axes visualizing quantitative scales. The resulting number may be different so that values are "nice" (multiples of 2, 5, 10) and lie within the underlying scale's range.
   *
   * __Default value__: Determine using a formula `ceil(width/40)` for x and `ceil(height/40)` for y.
   *
   * @minimum 0
   */
  tickCount?: number;

  /**
   * The padding, in pixels, between title and axis.
   */
  titlePadding?: number;

  /**
   * Explicitly set the visible axis tick values.
   */
  values?: number[] | string[] | boolean[] | DateTime[];
}
