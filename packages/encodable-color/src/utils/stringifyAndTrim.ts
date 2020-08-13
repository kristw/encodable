/**
 * Ensure value is a string
 * @param {any} value
 */
export default function stringifyAndTrim<T>(value?: T) {
  return String(value).trim();
}
