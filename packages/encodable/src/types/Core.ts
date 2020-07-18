// Same with vega-lite version
/** Possible values */
export type Value = number | string | boolean | null;

// Override: exclude geojson type
/** field type */
export type Type = 'quantitative' | 'ordinal' | 'temporal' | 'nominal';

/** A value that has .toString() function */
export type StringLike = { toString(): string };

export type NumberLike = { valueOf(): number };

export type Formatter = (d: unknown) => string;
