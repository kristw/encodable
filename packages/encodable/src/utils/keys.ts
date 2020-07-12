/**
 * This is a stricter version of Object.keys but with better types.
 * See https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
 */
const keys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];

export default keys;
