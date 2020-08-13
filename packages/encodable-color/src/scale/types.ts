import type { ScaleOrdinal } from 'd3-scale';

export type StringLike = { toString(): string };

export type ColorLookup = {
  [key: string]: string;
};

export type AnyOrdinalScale = ScaleOrdinal<StringLike, string>;

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
