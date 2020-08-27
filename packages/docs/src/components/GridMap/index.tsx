import React, { useMemo } from 'react';
import { extent as d3Extent } from 'd3-array';
import { PlainObject } from 'encodable';
import { keyBy } from 'lodash';
import { GridMapEncoding, gridMapEncoderFactory } from './Encoder';
import layout from './usaLayout';

type GridMapProps = {
  padding?: number;
  data: PlainObject[];
  encoding?: Partial<GridMapEncoding>;
  height: number;
  width: number;
};

export default function GridMap({ padding = 8, width, height, data, encoding }: GridMapProps) {
  // Parse encoding and create encoder
  const encoder = useMemo(() => gridMapEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);

  const { fill, stroke, key: keyChannel } = encoder.channels;

  const dataByKey = useMemo(() => keyBy(data, d => keyChannel.getValueFromDatum(d)), [
    data,
    keyChannel,
  ]);

  const xExtent = d3Extent(layout, d => d.x) as [number, number];
  const yExtent = d3Extent(layout, d => d.y) as [number, number];
  const numColumns = xExtent[1] - xExtent[0] + 1;
  const numRows = yExtent[1] - yExtent[0] + 1;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const cellWidth = innerWidth / numColumns;
  const cellHeight = innerHeight / numRows;
  const cellSize = Math.min(cellHeight, cellWidth);

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${(width - cellSize * numColumns) / 2},${
          (height - cellSize * numRows) / 2
        })`}
      >
        {layout.map(({ x, y, key, name }) => {
          const datum = dataByKey[key] ?? dataByKey[name];
          return (
            <g key={key} transform={`translate(${x * cellSize},${y * cellSize})`}>
              <rect
                width={cellSize}
                height={cellSize}
                fill={fill.encodeDatum(datum, 'none')}
                stroke={stroke.encodeDatum(datum, 'none')}
              />
              <text
                x={cellSize / 2}
                y={cellSize / 2}
                dy="0.3em"
                textAnchor="middle"
                fontSize="0.7em"
              >
                {key}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
