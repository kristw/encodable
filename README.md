# 🎭 encodable

[![Codecov branch](https://img.shields.io/codecov/c/github/apache-superset/encodable/master.svg?style=flat-square)](https://codecov.io/gh/apache-superset/encodable/branch/master)
[![Build Status](https://img.shields.io/travis/com/apache-superset/encodable/master.svg?style=flat-square
)](https://travis-ci.com/apache-superset/encodable)
[![David](https://img.shields.io/david/dev/apache-superset/encodable.svg?style=flat-square)](https://david-dm.org/apache-superset/encodable?type=dev)

> [`vega-lite`](https://github.com/vega/vega-lite) gives you a grammar and rendering engine that you can use to create many different visualizations from it. However, the visualizations you can created are limited by what `vega-lite` supports and you also need to figure out how to describe your visualization and its interactions in `vega-lite`'s grammar.

> `encodable` works the opposite way. When you already have a specific visualization in mind and know how to build it, this library helps you **make the component "encodable"** and provide standardized component API similar to `vega-lite`'s grammar for consumers to define their encoding.

The `encodable` package 

* provides typings for defining visual encoding channels for a component.
* adopts the grammar from `vega-lite` to define visual encoding channels as well as logic for determining smart defaults (e.g. choosing scale type based on data type, etc.) 
* parses incoming visual encoding into utility functions that helps how you render the visualization component. 
* leverages `superset-ui` packages to use the number and time formatters as well as color scales.
* does NOT render the component.

<!-- ## Demo

Most recent release: https://apache-superset.github.io/encodable

Current master: https://superset-ui.netlify.com -->

## Packages

| Package | Version |
|--|--|
| [encodable](https://github.com/apache-superset/encodable/tree/master/packages/encodable) | [![Version](https://img.shields.io/npm/v/encodable.svg?style=flat-square)](https://img.shields.io/npm/v/encodable.svg?style=flat-square) |

## APIs

### Encoder

An `Encoder` is a utility class created once per chart type. 
* It consists of one or more `ChannelEncoder`
* It takes users' definitions of the channels (`vega-lite` syntax), then resolves ambiguity and produce complete definition and actionable utility functions. 

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

The `factory` encapsulates the awkward `channelTypes` and `defaultEncoding`
* which are constants across all `Encoder` instance of this chart
* making it convenient to create a new `Encoder` from `encoding` because `factory.create(encoding)` only needs one argument: `encoding`.

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
      scale: { range: ['red', 'green', 'blue'] } 
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

Unlike the nominal field, `items` is not included in the output, so you cannot use `legendInfo[0].items` directly. Have to create legend items manually from inputs. 

In the future we can implement logic to infer the appropriate inputs from continuous domain and output items the same way the nominal field does.

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

### ChannelEncoder

`ChannelEncoder` takes user-defined channel definition, complete and parse into an object with set of utility functions useful for rendering that channel. 

The "rendering" mention here is framework-independent. Chart component developer is required to figure out how to implement the rendering themselves. `ChannelEncoder` acts as a middle layer to standardize chart component consumer API, then translate the configuration into actionable functions.

#### Example usage

```ts
const encoder = new ChannelEncoder({
  name: 'x',
  channelType: 'X',
  definition: {
    type: 'quantitative',
    field: 'speed',
    title: 'Speed',
    format: '.2f',
    scale: {
      type: 'linear',
      domain: [0, 100],
      range: [0, 1],
    }
  },
});

encoder.encodeValue(50); // 0.5
encoder.encodeDatum({ speed: 50 }); // 0.5
encoder.formatValue(10); // 10.00
encoder.formatDatum({ speed: 50 }); // 50.00
encoder.getTitle(); // 'Speed'
encoder.getDomain([{ speed: 10 }, { speed: 20 }]); // [10, 20]
encoder.scale // scale function (e.g. d3.scaleLinear, d3.scaleLog, depends on the definition)
```

### createScaleFromScaleConfig(...)

Function for parsing scales from configuration object into D3 scales as well as connecting to `@superset-ui/colors` to get color schemes by name. Support most types of scale that D3/vega-lite has. See [vega-lite's scale documentation](https://vega.github.io/vega-lite/docs/scale.html) for more details.

#### Example usage

```js
const scale = createScaleFromScaleConfig({
  type: 'linear',
  domain: [0, 10],
  range: [0, 100],
});
expect(scale(10)).toEqual(100);
```

```js
const scale = createScaleFromScaleConfig({
  type: 'utc',
  domain: [
    {
      year: 2019,
      month: 7,
      date: 5,
      utc: true,
    },
    {
      year: 2019,
      month: 7,
      date: 30,
      utc: true,
    },
  ],
  range: [0, 100],
  nice: { interval: 'month', step: 2 },
});
expect((scale as ScaleTime<number, number>).domain()).toEqual([
  new Date(Date.UTC(2019, 6, 1)),
  new Date(Date.UTC(2019, 8, 1)),
]);
```

The following scale properties are supported. (See `Scale.ts`.)

```ts
'domain'
'range'
'reverse'
'align'
'base'
'clamp'
'constant'
'exponent'
'interpolate' // add placeholder to be implemented
'nice'
'padding'
'paddingInner'
'paddingOuter'
'reverse'
'round'
'scheme'
'namespace'
'zero'
```

## Contribution and development guide

Please read the [contributing guidelines](CONTRIBUTING.md) which include development environment setup
and other things you should know about coding in this repo.

### License

Apache-2.0
