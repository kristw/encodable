## 🎭 encodable / API / `Encoder`

An `Encoder` is a utility class created once per chart type.

- It consists of one or more `ChannelEncoder`
- It takes users' definitions of the channels (`vega-lite` syntax), then resolves ambiguity and
  produce complete definition and actionable utility functions.

#### Example Usage

The component developer creates an encoder factory once.

```ts
type LineChartEncodingConfig = {
  // channelName: [ChannelType, output type, support multiple fields or not]
  x: ['X', number];
  y: ['Y', number];
  color: ['Color', string];
  tooltip: ['Text', string, 'multiple'];
};

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

Then create an `Encoder` for the incoming `encoding` and use it to facilitate rendering.

```ts
const encoder = lineChartEncoderFactory.create(encoding);
encoder.channels.x.getValueFromDatum({ speed: 100 }); // 100
encoder.channels.x.encodeDatum({ speed: 100 }); // 1
encoder.getGroupBys(); // ['brand', 'make', 'model']
```

### Legend

`encoder.getLegendInformation(dataset)` generates metadata for rendering legend.

#### Example usage

```ts
const legendInfo = factory
  .create({
    color: {
      type: 'nominal',
      field: 'brand',
      scale: { range: ['red', 'green', 'blue'] },
    },
    radius: { value: 5 },
    shape: { value: 'circle' },
  })
  .getLegendInformation([{ brand: 'Gucci' }, { brand: 'Prada' }]);

// [
//   // legend group information
//   {
//     field: 'brand',
//     type: 'nominal',
//     items: [
//       {
//         input: 'Gucci',
//         output: {
//           color: 'red',
//           radius: 5,
//           shape: 'circle',
//         },
//       },
//       {
//         input: 'Prada',
//         output: {
//           color: 'green',
//           radius: 5,
//           shape: 'circle',
//         },
//       },
//     ],
//   }
// ]
```

This also works with quantitative fields, with small difference.

```ts
const legendInfo = factory
  .create({
    color: {
      type: 'quantitative',
      field: 'price',
      scale: { domain: [0, 20], range: ['#fff', '#f00'] },
    },
    radius: {
      type: 'quantitative',
      field: 'price',
      scale: { domain: [0, 20], range: [0, 10] },
    },
    shape: { value: 'circle' },
  })
  .getLegendInformation();
```

Unlike the nominal field, `items` is not included in the output, so you cannot use
`legendInfo[0].items` directly. Have to create legend items manually from inputs.

In the future we can implement logic to infer the appropriate inputs from continuous domain and
output items the same way the nominal field does.

```ts
legendInfo[0].createLegendItems([0, 10, 20]);

// [
//   {
//     input: 0,
//     output: {
//       color: 'rgb(255, 255, 255)',
//       radius: 0,
//       shape: 'circle',
//     },
//   },
//   {
//     input: 10,
//     output: {
//       color: 'rgb(255, 128, 128)',
//       radius: 5,
//       shape: 'circle',
//     },
//   },
//   {
//     input: 20,
//     output: {
//       color: 'rgb(255, 0, 0)',
//       radius: 10,
//       shape: 'circle',
//     },
//   },
// ]
```
