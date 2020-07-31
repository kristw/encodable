import { ValueOf } from '../types/base';

const OverwritePolicy = {
  ALLOW: 'ALLOW',
  PROHIBIT: 'PROHIBIT',
  WARN: 'WARN',
} as const;

type OverwritePolicy = ValueOf<typeof OverwritePolicy>;

export default OverwritePolicy;
