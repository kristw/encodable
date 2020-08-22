import React, { useMemo } from 'react';
import { PlainObject } from 'encodable';
import { CoffeeChartEncoding, coffeeChartEncoderFactory } from './Encoder';

export interface CoffeeChartProps {
  className?: string;
  data: PlainObject[];
  encoding?: Partial<CoffeeChartEncoding>;
  height: number;
  width: number;
}

export default function CoffeeChart({ data = [], encoding, width, height }: CoffeeChartProps) {
  // Parse encoding and create encoder
  const encoder = useMemo(() => coffeeChartEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);

  const { drinkColor, drinkLevel, useToGoCup, label } = encoder.channels;

  return (
    <div
      style={{
        width,
        height,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'right',
          marginTop: height / 2 - 25 - 20,
          marginRight: 16,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            textTransform: 'capitalize',
            fontSize: 12,
            marginRight: 4,
            verticalAlign: 'middle',
          }}
        >
          {drinkColor.definition.title}
        </span>
        <svg
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
          width="45"
          height="12"
          viewBox="0 0 45 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="1" width="10" height="10" rx="2" fill="#EAC8C1" />
          <rect x="12" y="1" width="10" height="10" rx="2" fill="#DFAB6D" />
          <rect x="23" y="1" width="10" height="10" rx="2" fill="#B26C4D" />
          <rect x="34" y="1" width="10" height="10" rx="2" fill="#623D2B" />
        </svg>
      </div>
      {data.map((d, i) => {
        const isToGo = useToGoCup.getValueFromDatum(d);
        return (
          <svg
            key={label.getValueFromDatum(d)}
            style={{ display: 'inline-block', marginLeft: 4, marginRight: 4 }}
            width="46"
            height="70"
            viewBox="0 0 46 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath={`url(#coffee-level-clip-${i})`}>
              <path
                d="M7 11H39L35.4604 47.3873C35.261 49.4367 33.5383 51 31.4792 51H14.534C12.4755 51 10.753 49.4376 10.553 47.3887L7 11Z"
                fill={drinkColor.encodeDatum(d, 'none')}
              />
            </g>
            {isToGo && (
              <>
                <path
                  d="M10.4446 5.5H35.5085C37.6015 5.5 39.2266 7.32478 38.9851 9.40381L34.5715 47.4038C34.3665 49.1687 32.8716 50.5 31.0948 50.5H14.457C12.6663 50.5 11.1644 49.1483 10.9764 47.3675L6.96395 9.36752C6.7457 7.3006 8.36619 5.5 10.4446 5.5Z"
                  stroke="black"
                />
                <path
                  d="M6 5.5H40C41.3807 5.5 42.5 6.61929 42.5 8C42.5 9.38071 41.3807 10.5 40 10.5H6C4.61929 10.5 3.5 9.38071 3.5 8C3.5 6.61929 4.61929 5.5 6 5.5Z"
                  fill="white"
                  stroke="black"
                />
                <rect x="9.5" y="0.5" width="27" height="5" stroke="black" />
              </>
            )}
            {!isToGo && (
              <>
                <path
                  d="M38.5664 17.5L38.9414 14.5H42C43.933 14.5 45.5 16.067 45.5 18V41C45.5 42.933 43.933 44.5 42 44.5H35.0664L35.4414 41.5H41C41.8284 41.5 42.5 40.8284 42.5 40V19C42.5 18.1716 41.8284 17.5 41 17.5H38.5664Z"
                  stroke="black"
                />
                <path
                  d="M10.9356 47.4118L6.56273 10.5H39.4306L34.6152 47.4523C34.388 49.1957 32.9027 50.5 31.1446 50.5H14.4112C12.6375 50.5 11.1442 49.1732 10.9356 47.4118Z"
                  stroke="black"
                />
              </>
            )}
            <text x="23" y="66" textAnchor="middle" fill="#222" fontSize="12px" fontWeight="bold">
              {label.formatDatum(d)}
            </text>
            <defs>
              <clipPath id={`coffee-level-clip-${i}`}>
                <rect
                  y={11 + 40 - drinkLevel.encodeDatum(d, 0) * 40}
                  width="46"
                  height={40}
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        );
      })}
    </div>
  );
}
