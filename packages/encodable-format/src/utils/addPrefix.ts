export default function addPrefix(prefix: string, value: string) {
  return value.startsWith(prefix) ? value : prefix + value;
}
