import { Pie } from '@nivo/pie';
import React, { useMemo } from 'react';
import { PlainObject, Padding, mergePadding } from 'encodable';
import { DonutChartEncoding, donutChartEncoderFactory } from './Encoder';

export interface DonutChartProps {
  data: PlainObject[];
  encoding?: Partial<DonutChartEncoding>;
  height: number;
  width: number;
  padding?: Partial<Padding>;
}

const DEFAULT_PADDING = { top: 40, right: 80, bottom: 40, left: 80 };

export default function DonutChart({
  width,
  height,
  data = [],
  padding,
  encoding = {},
}: DonutChartProps) {
  // Parse encoding and create encoder
  const encoder = useMemo(() => donutChartEncoderFactory.create(encoding), [encoding]);

  const encodedData = useMemo(() => {
    encoder.setDomainFromDataset(data);
    const { label, size, pattern, color } = encoder.channels;

    return data.map(d => ({
      id: label.getValueFromDatum(d, ''),
      value: size.getValueFromDatum(d, 0),
      pattern: pattern.encodeDatum(d, ''),
      color: color.encodeDatum(d, '#ccc'),
    }));
  }, [data, encoder]);

  type Datum = typeof encodedData[0];

  return (
    <Pie
      animate
      width={width}
      height={height}
      data={encodedData}
      margin={mergePadding(padding, DEFAULT_PADDING)}
      theme={{
        labels: {
          text: {
            fontFamily: 'Raleway',
            fontSize: 14,
            fontWeight: 500,
          },
        },
      }}
      innerRadius={0.5}
      padAngle={0.7}
      colors={d => (d as Datum).color}
      cornerRadius={3}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#ffffff"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor="#fff"
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333"
      motionStiffness={90}
      motionDamping={15}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            pattern: 'dots',
          },
          id: 'dots',
        },
        {
          match: {
            pattern: 'lines',
          },
          id: 'lines',
        },
      ]}
    />
  );
}
