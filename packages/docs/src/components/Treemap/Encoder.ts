import { createEncoderFactory, DeriveEncoding } from 'encodable';

type TreemapConfig = {
  color: ['Color', string];
  label: ['Text', string];
  parent: ['Text', string];
  size: ['Numeric', number];
};

export const treemapEncoderFactory = createEncoderFactory<TreemapConfig>({
  channelTypes: {
    color: 'Color',
    label: 'Text',
    parent: 'Text',
    size: 'Numeric',
  },
  defaultEncoding: {
    color: { value: 'black' },
    label: { value: '' },
    parent: { field: 'parent' },
    size: { value: 1 },
  },
});

export type TreemapEncoding = DeriveEncoding<TreemapConfig>;
