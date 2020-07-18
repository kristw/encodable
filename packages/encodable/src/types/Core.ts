// Same with vega-lite version
/** Possible values */
export type Value = number | string | boolean | null;

// Override: exclude geojson type
/** field type */
export type Type = 'quantitative' | 'ordinal' | 'temporal' | 'nominal';

export type Formatter = (d: unknown) => string;
