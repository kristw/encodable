import { SyncRegistry, RegistryConfig } from '@encodable/registry';
import { ScaleOrdinal } from 'd3-scale';

type StringLike = { toString(): string };

export default class ColorNamespace {
  forceColors: SyncRegistry<{ [key: string]: string }>;

  scales: SyncRegistry<ScaleOrdinal<StringLike, string>>;

  constructor({ name = 'ColorNamespace', globalId, ...rest }: RegistryConfig = {}) {
    this.forceColors = new SyncRegistry<{ [key: string]: string }>({
      globalId: typeof globalId === 'undefined' ? undefined : `${globalId}/forceColors`,
      ...rest,
    });
    this.scales = new SyncRegistry<ScaleOrdinal<StringLike, string>>({
      globalId: typeof globalId === 'undefined' ? undefined : `${globalId}/scales`,
      ...rest,
    });
  }
}
