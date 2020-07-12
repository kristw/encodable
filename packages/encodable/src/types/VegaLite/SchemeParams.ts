export interface SchemeParams {
  /**
   * A color scheme name for ordinal scales (e.g., `"category10"` or `"blues"`).
   *
   * For the full list of supported schemes, please refer to the [Vega Scheme](https://vega.github.io/vega/docs/schemes/#reference) reference.
   */
  name: string;

  /**
   * The extent of the color range to use. For example `[0.2, 1]` will rescale the color scheme such that color values in the range _[0, 0.2)_ are excluded from the scheme.
   */
  extent?: number[];

  /**
   * The number of colors to use in the scheme. This can be useful for scale types such as `"quantize"`, which use the length of the scale range to determine the number of discrete bins for the scale domain.
   */
  count?: number;
}
