export interface SchemeParams {
  /**
   * A color scheme name for ordinal scales (e.g., `"category10"` or `"blues"`).
   */
  name?: string;

  /**
   * Color namespace.
   * Using an ordinal scale with the same scheme name,
   * will point to the same scale instance.
   * Using namespace can control the scale sharing.
   * By default, all scales are considered to be in the default namespace.
   * If this field is specified, e.g. 'a'.
   * Only ordinal scale with same scheme name and namespace 'a'
   * will be pointed to this same scale instance.
   *
   * __Note:__ Vega-Lite does not have this field.
   */
  namespace?: string;

  /**
   * The extent of the color range to use. For example `[0.2, 1]` will rescale the color scheme such that color values in the range _[0, 0.2)_ are excluded from the scheme.
   */
  extent?: number[];

  /**
   * The number of colors to use in the scheme. This can be useful for scale types such as `"quantize"`, which use the length of the scale range to determine the number of discrete bins for the scale domain.
   */
  count?: number;
}
