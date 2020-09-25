import { createEncoderFactory, DeriveEncoding } from 'encodable';

type DonutChartConfig = {
  color: ['Color', string];
  size: ['Numeric', number];
  pattern: ['Category', 'dots' | 'lines' | ''];
  label: ['Text', string];
};

export const donutChartEncoderFactory = createEncoderFactory<DonutChartConfig>({
  channelTypes: {
    color: 'Color',
    size: 'Numeric',
    pattern: 'Category',
    label: 'Text',
  },
  defaultEncoding: {
    color: { type: 'nominal', field: 'id' },
    pattern: { value: '' },
    size: { type: 'quantitative', field: 'value' },
    label: { field: 'id' },
  },
});

export type DonutChartEncoding = DeriveEncoding<DonutChartConfig>;
