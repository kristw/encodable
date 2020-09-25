import React, { useMemo } from 'react';
import { PlainObject } from 'encodable';
import { CoffeeChartEncoding, coffeeChartEncoderFactory } from './Encoder';
import CoffeeCup from './CoffeeCup';

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
          marginTop: height / 2 - 40 - 20,
          marginRight: 16,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            textTransform: 'capitalize',
            color: '#222',
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
        return (
          <CoffeeCup
            key={label.getValueFromDatum(d)}
            drinkColor={drinkColor.encodeDatum(d, 'none')}
            drinkLevel={drinkLevel.encodeDatum(d, 0)}
            isToGo={useToGoCup.getValueFromDatum(d)}
            label={label.formatDatum(d)}
          />
        );
      })}
    </div>
  );
}
