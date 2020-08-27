import React, { useMemo } from 'react';
import { PlainObject } from 'encodable';
import { WordCloudEncoding, wordCloudEncoderFactory } from './Encoder';

export interface WordCloudProps {
  className?: string;
  data: PlainObject[];
  encoding?: Partial<WordCloudEncoding>;
  height: number;
  width: number;
}

export default function WordCloud({
  className,
  width,
  height,
  data = [],
  encoding = {},
}: WordCloudProps) {
  // Parse encoding and create encoder
  const encoder = useMemo(() => wordCloudEncoderFactory.create(encoding), [encoding]);

  encoder.setDomainFromDataset(data);

  return (
    <div
      className={className}
      style={{
        width,
        height: height - 32,
        paddingTop: 16,
        paddingBottom: 16,
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {data.map(d => (
        <div
          key={d.name}
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            color: encoder.channels.color.encodeDatum(d, '#'),
            fontSize: encoder.channels.fontSize.encodeDatum(d, 0),
            fontFamily: encoder.channels.fontFamily.encodeDatum(d, 'Montserrat'),
            fontWeight: encoder.channels.fontWeight.encodeDatum(d, 'normal'),
          }}
        >
          {encoder.channels.emoji.encodeDatum(d, '')} {encoder.channels.text.getValueFromDatum(d)}
        </div>
      ))}
    </div>
  );
}
