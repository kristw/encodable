import { createEncoderFactory, DeriveEncoding } from 'encodable';

type ScatterPlotConfig = {
  stroke: ['Color', string];
  fill: ['Color', string];
  label: ['Text', string];
  x: ['X', number];
  y: ['Y', number];
};

export const scatterPlotEncoderFactory = createEncoderFactory<ScatterPlotConfig>({
  channelTypes: {
    stroke: 'Color',
    fill: 'Color',
    label: 'Text',
    x: 'X',
    y: 'Y',
  },
  defaultEncoding: {
    stroke: { value: '#FB664B' },
    fill: { value: 'none' },
    label: { value: '' },
    x: { type: 'quantitative', field: 'x' },
    y: { type: 'quantitative', field: 'y' },
  },
});

export type ScatterPlotEncoding = DeriveEncoding<ScatterPlotConfig>;
