import React, { useMemo } from 'react';
import { PlainObject } from 'encodable';
import { BalloonPlotEncoding, balloonPlotEncoderFactory } from './Encoder';
import Balloon from './Balloon';

export interface BalloonPlotProps {
  className?: string;
  data: PlainObject[];
  encoding?: Partial<BalloonPlotEncoding>;
  height: number;
  width: number;
}

const padding = 60;

export default function BalloonPlot({ data = [], encoding, width, height }: BalloonPlotProps) {
  // Parse encoding and create encoder
  const encoder = useMemo(() => balloonPlotEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);
  encoder.channels.x.scale!.range([padding, width - padding]);
  encoder.channels.y.scale!.range([height - padding, padding + 10]);

  const { x, y, text, text2, size, color } = encoder.channels;

  return (
    <svg width={width} height={height}>
      {data.map(d => (
        <Balloon
          key={text.formatDatum(d)}
          x={x.encodeDatum(d, 0)}
          y={y.encodeDatum(d, 0)}
          y2={height}
          size={size.encodeDatum(d, 0)}
          color={color.encodeDatum(d, 'none')}
          text={text.formatDatum(d)}
          text2={text2.formatDatum(d)}
        />
      ))}
    </svg>
  );
}
