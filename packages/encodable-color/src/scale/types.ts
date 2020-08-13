import type { ScaleOrdinal } from 'd3-scale';

export type StringLike = { toString(): string };

export type ColorLookup = {
  [key: string]: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyOrdinalScale = ScaleOrdinal<any, string>;

export type ScaleStore = {
  manualColors: ColorLookup;
  scale: AnyOrdinalScale;
};

export type ColorNamespaceStore = {
  name: string;
  manualColors: ColorLookup;
  scales: {
    [scheme: string]: ScaleStore;
  };
};
