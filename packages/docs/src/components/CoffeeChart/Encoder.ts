import { createEncoderFactory, DeriveEncoding } from 'encodable';

type CoffeeChartConfig = {
  drinkColor: ['Color', string];
  drinkLevel: ['Numeric', number];
  useToGoCup: ['Category', boolean];
  label: ['Text', string];
};

export const coffeeChartEncoderFactory = createEncoderFactory<CoffeeChartConfig>({
  channelTypes: {
    drinkColor: 'Color',
    drinkLevel: 'Numeric',
    useToGoCup: 'Category',
    label: 'Text',
  },
  defaultEncoding: {
    drinkColor: { value: '#623D28' },
    drinkLevel: { value: 0.5 },
    useToGoCup: { value: false },
    label: { value: '' },
  },
});

export type CoffeeChartEncoding = DeriveEncoding<CoffeeChartConfig>;
