import React, { useMemo } from 'react';
import { PlainObject, mergePadding, Padding } from 'encodable';
import { curveMonotoneX } from '@vx/curve';
import { AreaClosed } from '@vx/shape';
import { GridRows, GridColumns } from '@vx/grid';
import { LinearGradient } from '@vx/gradient';
import { AreaChartEncoding, areaChartEncoderFactory } from './Encoder';

export interface AreaChartProps {
  className?: string;
  data: PlainObject[];
  encoding?: Partial<AreaChartEncoding>;
  height: number;
  width: number;
  padding?: Partial<Padding>;
}

const DEFAULT_PADDING: Padding = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const background = '#99DEBC';
const background2 = '#C8F1BE';
const accentColor = '#F8BBC4';

export default function AreaChart({ data = [], padding, encoding, width, height }: AreaChartProps) {
  const { top, left, bottom, right } = mergePadding(padding, DEFAULT_PADDING);
  // Parse encoding and create encoder
  const encoder = useMemo(() => areaChartEncoderFactory.create(encoding), [encoding]);

  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;

  encoder.setDomainFromDataset(data);
  if (encoder.channels.x.scale) {
    encoder.channels.x.scale.range([0, innerWidth]);
  }
  if (encoder.channels.y.scale) {
    encoder.channels.y.scale.range([innerHeight, 0]);
  }

  const { x, y } = encoder.channels;

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="url(#area-background-gradient)"
        rx={8}
      />
      <LinearGradient id="area-background-gradient" from={background} to={background2} />
      <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
      <g transform={`translate(${left},${top})`}>
        <GridRows
          scale={y.scale!}
          width={innerWidth}
          strokeDasharray="3,3"
          stroke={accentColor}
          strokeOpacity={0.3}
          pointerEvents="none"
        />
        <GridColumns
          scale={x.scale!}
          height={innerHeight}
          strokeDasharray="3,3"
          stroke={accentColor}
          strokeOpacity={0.3}
          pointerEvents="none"
        />
        <AreaClosed
          data={data}
          x={d => x.encodeDatum(d, 0)}
          y={d => y.encodeDatum(d, 0)}
          yScale={y.scale!}
          strokeWidth={1}
          stroke="url(#area-gradient)"
          fill="url(#area-gradient)"
          curve={curveMonotoneX}
        />
      </g>
    </svg>
  );
}
