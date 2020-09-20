import React, { useMemo } from 'react';
import { PlainObject, mergePadding, Padding } from 'encodable';
import {
  stratify,
  treemap,
  treemapSquarify,
  treemapResquarify,
  treemapBinary,
  treemapDice,
  treemapSlice,
  treemapSliceDice,
} from 'd3-hierarchy';
import { TreemapEncoding, treemapEncoderFactory } from './Encoder';

const TileMethods = {
  squarify: treemapSquarify,
  binary: treemapBinary,
  dice: treemapDice,
  resquarify: treemapResquarify,
  slice: treemapSlice,
  'slice-dice': treemapSliceDice,
} as const;

export interface TreemapProps {
  className?: string;
  data: PlainObject[];
  tileMethod?: keyof typeof TileMethods;
  encoding?: Partial<TreemapEncoding>;
  height: number;
  width: number;
  padding?: Partial<Padding>;
}

const DEFAULT_PADDING: Padding = {
  top: 10,
  left: 10,
  bottom: 10,
  right: 10,
};

export default function BarChart({
  data = [],
  padding,
  encoding,
  width,
  height,
  tileMethod,
}: TreemapProps) {
  const { top, left, bottom, right } = mergePadding(padding, DEFAULT_PADDING);
  // Parse encoding and create encoder
  const encoder = useMemo(() => treemapEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);

  const { label, color, size, parent } = encoder.channels;

  const hierarchy = stratify<PlainObject>()
    .id(d => label.getValueFromDatum(d))
    .parentId(d => parent.getValueFromDatum(d))(data)
    .sum(d => size.encodeDatum(d, 0));

  const method = TileMethods[tileMethod ?? 'squarify'] ?? treemapSquarify;

  const leaves = treemap<PlainObject>()
    .tile(method)
    .size([width - left - right, height - top - bottom])
    .padding(1)
    .round(true)(hierarchy)
    .leaves();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${left},${top})`}>
        {leaves.map(l => (
          <rect
            key={label.getValueFromDatum(l.data, '')}
            fill={color.encodeDatum(l.data, 'none')}
            x={l.x0}
            y={l.y0}
            width={l.x1 - l.x0}
            height={l.y1 - l.y0}
          />
        ))}
      </g>
    </svg>
  );
}
