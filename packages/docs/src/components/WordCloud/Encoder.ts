import { createEncoderFactory, DeriveEncoding } from 'encodable';

type WordCloudEncodingConfig = {
  color: ['Color', string];
  emoji: ['Category', string];
  fontFamily: ['Category', string];
  fontSize: ['Numeric', number];
  fontWeight: ['Category', number | 'bold' | 'normal' | 'bolder' | 'lighter'];
  text: ['Text', string];
};

export const wordCloudEncoderFactory = createEncoderFactory<WordCloudEncodingConfig>({
  channelTypes: {
    color: 'Color',
    emoji: 'Category',
    fontFamily: 'Category',
    fontSize: 'Numeric',
    fontWeight: 'Category',
    text: 'Text',
  },
  defaultEncoding: {
    color: { value: 'black' },
    emoji: { value: '' },
    fontFamily: { value: 'Montserrat' },
    fontSize: { value: 20 },
    fontWeight: { value: 'bold' },
    text: { value: '' },
  },
});

export type WordCloudEncoding = DeriveEncoding<WordCloudEncodingConfig>;
