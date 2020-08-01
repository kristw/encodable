export function addPrefix(prefix: string, value: string) {
  return value.startsWith(prefix) ? value : prefix + value;
}

export function removePrefix(prefix: string, value: string) {
  return value.startsWith(prefix) ? value.slice(prefix.length, value.length) : value;
}

export function addSign(formatString: string) {
  return addPrefix('+', formatString);
}
