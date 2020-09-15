import { createEncoderFactory, DeriveEncoding } from 'encodable';

type BarChartConfig = {
  color: ['Color', string];
  label: ['Text', string];
  x: ['X', number];
  y: ['YBand', number];
};

export const barChartEncoderFactory = createEncoderFactory<BarChartConfig>({
  channelTypes: {
    color: 'Color',
    label: 'Text',
    x: 'X',
    y: 'YBand',
  },
  defaultEncoding: {
    color: { value: 'black' },
    label: { value: '' },
    x: { type: 'quantitative', field: 'x' },
    y: { type: 'quantitative', field: 'y' },
  },
});

export type BarChartEncoding = DeriveEncoding<BarChartConfig>;
