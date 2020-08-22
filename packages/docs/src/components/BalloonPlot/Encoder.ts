import { createEncoderFactory, DeriveEncoding } from 'encodable';

type BalloonPlotConfig = {
  color: ['Color', string];
  size: ['Numeric', number];
  text: ['Text', string];
  text2: ['Text', string];
  x: ['XBand', number];
  y: ['Y', number];
};

// eslint-disable-next-line import/prefer-default-export
export const balloonPlotEncoderFactory = createEncoderFactory<BalloonPlotConfig>({
  channelTypes: {
    color: 'Color',
    size: 'Numeric',
    text: 'Text',
    text2: 'Text',
    x: 'XBand',
    y: 'Y',
  },
  defaultEncoding: {
    color: { value: 'black' },
    size: { value: 40 },
    text: { value: '' },
    text2: { value: '' },
    x: { field: 'x' },
    y: { field: 'y' },
  },
});

export type BalloonPlotEncoding = DeriveEncoding<BalloonPlotConfig>;
