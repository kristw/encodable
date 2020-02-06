// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PlainObject<Key extends string = string, Value extends any = any> = {
  [key in Key]: Value;
};

export type Dataset<T extends string = string> = Partial<PlainObject<T>>[];
