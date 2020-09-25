import React, { useMemo } from 'react';
import { PlainObject, mergePadding, Padding } from 'encodable';
import ReactRough, { Rectangle } from 'react-rough';
import { BarChartEncoding, barChartEncoderFactory } from './Encoder';

export interface BarChartProps {
  className?: string;
  data: PlainObject[];
  encoding?: Partial<BarChartEncoding>;
  height: number;
  width: number;
  padding?: Partial<Padding>;
}

const DEFAULT_PADDING: Padding = {
  top: 30,
  left: 162,
  bottom: 30,
  right: 60,
};

export default function BarChart({ data = [], padding, encoding, width, height }: BarChartProps) {
  const { top, left, bottom, right } = mergePadding(padding, DEFAULT_PADDING);
  // Parse encoding and create encoder
  const encoder = useMemo(() => barChartEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);
  if (encoder.channels.x.scale) {
    encoder.channels.x.scale.range([0, width - (left + right)]);
  }
  let band = 10;
  if (encoder.channels.y.scale) {
    encoder.channels.y.scale.range([0, height - (top + bottom)]);
    if ('bandwidth' in encoder.channels.y.scale) {
      band = encoder.channels.y.scale.bandwidth();
    }
  }

  const { x, y, label, color } = encoder.channels;

  return (
    <div style={{ position: 'relative' }}>
      <ReactRough width={width} height={height} renderer="svg">
        {data.map(d => (
          <Rectangle
            key={label.formatDatum(d)}
            x={left}
            y={top + y.encodeDatum(d, 0)}
            width={x.encodeDatum(d, 0)}
            height={band}
            fill={color.encodeDatum(d, 'none')}
            stroke={color.encodeDatum(d, 'none')}
          />
        ))}
      </ReactRough>
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width={width} height={height}>
        {data.map(d => (
          <>
            <text
              key={label.formatDatum(d)}
              dy=".3em"
              fontSize=".9em"
              x={left - 10}
              y={top + y.encodeDatum(d, 0) + band / 2}
              fill={color.encodeDatum(d, 'none')}
              textAnchor="end"
            >
              {label.formatDatum(d)}
            </text>
            <text
              key={label.formatDatum(d)}
              dy=".3em"
              fontSize=".9em"
              x={left + x.encodeDatum(d, 0) + 10}
              y={top + y.encodeDatum(d, 0) + band / 2}
              fill={color.encodeDatum(d, 'none')}
              textAnchor="start"
            >
              {x.formatDatum(d)}
            </text>
          </>
        ))}
      </svg>
    </div>
  );
}
