import { createEncoderFactory, DeriveEncoding } from 'encodable';

type GridMapConfig = {
  key: ['Text', string];
  fill: ['Color', string];
  stroke: ['Color', string];
};

export const gridMapEncoderFactory = createEncoderFactory<GridMapConfig>({
  channelTypes: {
    key: 'Text',
    fill: 'Color',
    stroke: 'Color',
  },
  defaultEncoding: {
    key: { field: 'key' },
    fill: { value: '#A0F379' },
    stroke: { value: '#fff' },
  },
});

export type GridMapEncoding = DeriveEncoding<GridMapConfig>;
