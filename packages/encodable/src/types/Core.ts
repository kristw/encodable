// Same with vega-lite version
/** Possible values */
export type Value = number | string | boolean | null;

// Override: exclude geojson type
/** field type */
export type Type = 'quantitative' | 'ordinal' | 'temporal' | 'nominal';

/** A value that has .toString() function */
export type StringLike = { toString(): string };

export type NumberLike = { valueOf(): number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PlainObject<Key extends string = string, Value extends any = any> = {
  [key in Key]: Value;
};

export type Dataset<T extends string = string> = Partial<PlainObject<T>>[];

export type Formatter = (d: unknown) => string;
