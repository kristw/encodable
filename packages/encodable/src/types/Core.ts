//
/**
 * Possible types of output values for each channel.
 * Includes `null` but does not include `undefined` so it can be stored as JSON
 *
 * *vega-lite* codebase calls this type `Value`.
 */
export type DefaultOutput = number | string | boolean | null;

// Override: exclude geojson type
/**
 * field type
 *
 * *vega-lite* codebase calls this type `Type`
 */
export type FieldType = 'quantitative' | 'ordinal' | 'temporal' | 'nominal';

/** A value that has .valueOf() function */
export type NumberLike = { valueOf(): number };

/** A value that has .toString() function */
export type StringLike = { toString(): string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PlainObject<Key extends string = string, Value extends any = any> = {
  [key in Key]: Value;
};

export type Dataset<T extends string = string> = Partial<PlainObject<T>>[];

export type Formatter = (d: unknown) => string;
