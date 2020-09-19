---
name: ChannelType
menu: Encodable API
---

# ChannelType

When creating a configuration for a component, the component author needs to list all channels for the component with its type.

```ts
type EncodingConfig = {
  [k in string]: [ChannelType, Output, 'multiple'];
}
```

## ChannelType and Output types

These are the possible values for `ChannelType` and their corresponding `Output` have to be subset of the output types in the table below.

To make a channel accepts an array of definitions, such as *tooltip* channel that may take multiple fields, add `'multiple'` as the third item in the array.

| ChannelType | Example channel                                                                              | Output types                          |
| ----------- | -------------------------------------------------------------------------------------------- | ------------------------------------- |
| `X`         | bubble chart's x-position                                                                    | `number \| null`                      |
| `Y`         | bubble chart's y-position                                                                    | `number \| null`                      |
| `XBand`     | vertical bar chart's x-position                                                              | `number \| null`                      |
| `YBand`     | horizontal bar chart's y-position                                                            | `number \| null`                      |
| `Numeric`   | bubble chart's bubble size                                                                   | `number \| null`                      |
| `Color`     | bubble chart's bubble color                                                                  | `string \| null`                      |
| `Text`      | bubble chart's bubble label                                                                  | `string \| null`                      |
| `Category`  | bubble chart's fill or not (`boolean`), pattern (`string`), font weight (`string \| number`) | `string \| boolean \| number \| null` |

## Example

```ts
import { DeriveEncoding } from 'encodable';

type WordCloudEncodingConfig = {
  color: ['Color', string];
  emoji: ['Category', string];
  fontFamily: ['Category', string];
  fontSize: ['Numeric', number];
  fontWeight: ['Category', number | 'bold' | 'normal' | 'bolder' | 'lighter'];
  text: ['Text', string];
};

// Then an encoding type can be derived from the config.
type WordCloudEncoding = DeriveEncoding<WordCloudEncodingConfig>;
```
