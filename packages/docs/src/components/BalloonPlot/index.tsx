import React, { useMemo } from 'react';
import { PlainObject } from 'encodable';
import { BalloonPlotEncoding, balloonPlotEncoderFactory } from './Encoder';

export interface BalloonPlotProps {
  className?: string;
  data: PlainObject[];
  encoding?: Partial<BalloonPlotEncoding>;
  height: number;
  width: number;
}

export default function BalloonPlot({ data = [], encoding, width, height }: BalloonPlotProps) {
  // Parse encoding and create encoder
  const encoder = useMemo(() => balloonPlotEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);
  const padding = 60;
  encoder.channels.x.scale!.range([padding, width - padding]);
  encoder.channels.y.scale!.range([height - padding, padding]);

  const { x, y, text, text2, size, color } = encoder.channels;

  return (
    <svg width={width} height={height}>
      {data.map(d => {
        const colorValue = color.encodeDatum(d, 'none');
        const area = size.encodeDatum(d, 0);
        const length = Math.sqrt(area);
        return (
          <>
            <g transform={`translate(${x.encodeDatum(d)}, ${y.encodeDatum(d)})`}>
              <g transform={`scale(${length / 42})translate(-21, -21)`}>
                <line x1="12.5301" y1="54.1709" x2="0.530103" y2="21.1709" stroke="#DFAB6D" />
                <line x1="29.5301" y1="53.8291" x2="41.5301" y2="20.8291" stroke="#DFAB6D" />
                <path
                  d="M12 52H30V58C30 60.2091 28.2091 62 26 62H16C13.7909 62 12 60.2091 12 58V52Z"
                  fill="#623D2B"
                />
                <circle cx="21" cy="21" r="21" fill={colorValue} />
                <ellipse cx="20.5" cy="21" rx="13.5" ry="21" fill="rgba(255,255,255,0.6)" />
                <ellipse cx="21" cy="21" rx="5" ry="21" fill={colorValue} />
                <ellipse
                  cx="21"
                  cy="52.1176"
                  rx="2.11765"
                  ry="9"
                  transform="rotate(90 21 52.1176)"
                  fill="white"
                  fillOpacity="0.3"
                />
                <rect x="20" y="42" width="2" height="4" fill="#FDDC69" />
              </g>
              <text fontSize="12px" textAnchor="middle" y={-length / 2 - 22}>
                {text.formatDatum(d)}
              </text>
              <text fontSize="12px" textAnchor="middle" y={-length / 2 - 7}>
                {text2.formatDatum(d)}
              </text>
            </g>
            <line
              x1={x.encodeDatum(d, 0)}
              y1={y.encodeDatum(d, 0) + length}
              x2={x.encodeDatum(d, 0)}
              y2={height}
              strokeDasharray="4 4"
              stroke="#999"
              opacity="0.5"
            />
          </>
        );
      })}
    </svg>
  );
}
