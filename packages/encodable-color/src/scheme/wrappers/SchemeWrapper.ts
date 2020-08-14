import { ColorScheme } from '../../types';

export default abstract class SchemeWrapper<T extends ColorScheme> {
  protected readonly scheme: T;

  constructor(scheme: T) {
    this.scheme = scheme;
  }

  /** scheme type */
  get type(): T['type'] {
    return this.scheme.type;
  }

  /** id of this scheme */
  get id() {
    return this.scheme.id;
  }

  /** human-friendly name to refer to */
  get label() {
    return this.scheme.label;
  }

  /** more description (if any) */
  get description() {
    return this.scheme.description;
  }
}
