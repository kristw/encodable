import React, { useMemo } from 'react';
import { PlainObject } from 'encodable';
import ReactRough, { Rectangle } from 'react-rough';
import { BarChartEncoding, barChartEncoderFactory } from './Encoder';

export interface BarChartProps {
  className?: string;
  data: PlainObject[];
  encoding?: Partial<BarChartEncoding>;
  height: number;
  width: number;
  padding?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
}

const padding = 30;

export default function BarChart({ data = [], encoding, width, height }: BarChartProps) {
  // Parse encoding and create encoder
  const encoder = useMemo(() => barChartEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);
  if (encoder.channels.x.scale) {
    encoder.channels.x.scale.range([0, width - padding * 2]);
  }
  let band = 10;
  if (encoder.channels.y.scale) {
    encoder.channels.y.scale.range([0, height - padding * 2]);
    if ('bandwidth' in encoder.channels.y.scale) {
      band = encoder.channels.y.scale.bandwidth();
    }
  }

  const { x, y, label, color } = encoder.channels;

  try {
    console.log('hi', y.encodeDatum(data[0], 1));
  } catch (error) {
    console.log('e', error);
  }

  return encoder.channels.y.scale ? y.encodeDatum(data[0], 1) : <>no</>;

  return (
    <ReactRough width={width} height={height} renderer="svg">
      {data.map((d, i) => (
        <Rectangle
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          x={padding}
          y={padding + y.encodeDatum(d, 0)}
          width={x.encodeDatum(d, 0)}
          height={band}
          fill={color.encodeDatum(d, 'none')}
        />
      ))}
    </ReactRough>
  );
}
