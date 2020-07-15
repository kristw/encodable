// Also allow string in title
export interface TitleMixins {
  /**
   * A title for the field. If `null`, the title will be removed.
   *
   * __Default value:__  derived from the field's name and transformation function (`aggregate`, `bin` and `timeUnit`). If the field has an aggregate function, the function is displayed as part of the title (e.g., `"Sum of Profit"`). If the field is binned or has a time unit applied, the applied function is shown in parentheses (e.g., `"Profit (binned)"`, `"Transaction Date (year-month)"`). Otherwise, the title is simply the field name.
   *
   * __Notes__:
   *
   * 1) You can customize the default field title format by providing the [`fieldTitle`](https://vega.github.io/vega-lite/docs/config.html#top-level-config) property in the [config](https://vega.github.io/vega-lite/docs/config.html) or [`fieldTitle` function via the `compile` function's options](https://vega.github.io/vega-lite/docs/compile.html#field-title).
   *
   * 2) If both field definition's `title` and axis, header, or legend `title` are defined, axis/header/legend title will be used.
   */
  title?: string | null;
}

export type FormatType = 'number' | 'time';

export interface FormatMixins {
  /**
   * The text formatting pattern for labels of guides (axes, legends, headers) and text marks.
   *
   * - If the format type is `"number"` (e.g., for quantitative fields), this is D3's [number format pattern](https://github.com/d3/d3-format#locale_format).
   * - If the format type is `"time"` (e.g., for temporal fields), this is D3's [time format pattern](https://github.com/d3/d3-time-format#locale_format).
   */
  format?: string;
  /**
   * The format type for labels (`"number"` or `"time"`).
   *
   * __Default value:__
   * - `"time"` for temporal fields and ordinal and nominal fields with `timeUnit`.
   * - `"number"` for quantitative fields as well as ordinal and nominal fields without `timeUnit`.
   */
  formatType?: FormatType;
  // Not in vega-lite
  /**
   * Format in local time instead of UTC
   * only applicable if formatType is time
   *
   * __Default value:__ false
   */
  formatInLocalTime?: boolean;
}
