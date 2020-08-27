---
name: Creating a component
menu: Guides
route: '/intro'
---

# Creating a component

## Install

```sh
npm install encodable global-box
```

## Define encoding configuration

First define the encoding channels of the component

```ts
type LineChartEncodingConfig = {
  // channelName: [ChannelType, output type, support multiple fields or not]
  x: ['X', number];
  y: ['Y', number];
  color: ['Color', string];
  tooltip: ['Text', string, 'multiple'];
};
```

Then creates an encoder factory once.

```ts
const lineChartEncoderFactory = createEncoderFactory<LineChartEncodingConfig>({
  // This part is manual work to convert the `ChannelType` defined in `LineChartEncodingConfig` above
  // from `type` to `value`. `LineChartEncodingConfig` is the source of truth
  // and because it is generic for this function, type checking will ensure the only compatible value
  // for channelTypes is exactly like the one below.
  channelTypes: {
    x: 'X',
    y: 'Y',
    color: 'Color',
    tooltip: 'Text',
  },
  // Define default definition for each channel
  defaultEncoding: {
    x: { type: 'quantitative', field: 'x' },
    y: { type: 'quantitative', field: 'y' },
    color: { value: 'black' },
    tooltip: [],
  },
});

type LineChartEncoding = DeriveEncoding<LineChartEncodingConfig>;
```

The `factory` encapsulates `channelTypes` and `defaultEncoding`

- which are constants across all `Encoder` instance of this chart
- making it convenient to create a new `Encoder` from `encoding` because `factory.create(encoding)`
  only needs one argument: `encoding`.

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

This is how consumer-specified `encoding` may look like.

```ts
const encoding: LineChartEncoding = {
  x: { type: 'quantitative', field: 'speed', scale: { domain: [0, 100] } },
  y: { type: 'quantitative', field: 'price' },
  color: { type: 'nominal', field: 'brand' },
  tooltip: [{ field: 'make' }, { field: 'model' }],
};
```

## Implement rendering logic

Then create an `Encoder` for the incoming `encoding` and use it to facilitate rendering.

```ts
const encoder = lineChartEncoderFactory.create(encoding);
encoder.channels.x.getValueFromDatum({ speed: 100 }); // 100
encoder.channels.x.encodeDatum({ speed: 100 }); // 1
encoder.getGroupBys(); // ['brand', 'make', 'model']
```
