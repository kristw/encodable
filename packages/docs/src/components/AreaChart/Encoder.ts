import { createEncoderFactory, DeriveEncoding } from 'encodable';

type AreaChartConfig = {
  x: ['X', number];
  y: ['Y', number];
};

export const areaChartEncoderFactory = createEncoderFactory<AreaChartConfig>({
  channelTypes: {
    x: 'X',
    y: 'Y',
  },
  defaultEncoding: {
    x: { type: 'quantitative', field: 'x' },
    y: { type: 'quantitative', field: 'y' },
  },
});

export type AreaChartEncoding = DeriveEncoding<AreaChartConfig>;
