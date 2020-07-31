import addPrefix from './addPrefix';

export default function addSign(formatString: string) {
  return addPrefix('+', formatString);
}
