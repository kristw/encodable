# 🎭 encodable

[![Codecov branch](https://img.shields.io/codecov/c/github/apache-superset/encodable/master.svg?style=flat-square)](https://codecov.io/gh/apache-superset/encodable/branch/master)
[![Build Status](https://img.shields.io/travis/com/apache-superset/encodable/master.svg?style=flat-square
)](https://travis-ci.com/apache-superset/encodable)
[![David](https://img.shields.io/david/dev/apache-superset/encodable.svg?style=flat-square)](https://david-dm.org/apache-superset/encodable?type=dev)

> **tl;dr.** When you have a visualization component, this library helps you defines the visual channels that you can encode data into and provide API similar to `vega-lite`'s grammar for consumers to customize the visual encoding. 

## Packages

| Package | Version |
|--|--|
| [encodable](https://github.com/apache-superset/encodable/tree/master/packages/encodable) | [![Version](https://img.shields.io/npm/v/encodable.svg?style=flat-square)](https://img.shields.io/npm/v/encodable.svg?style=flat-square) |

### Why use `encodable`?

This library was heavily inspired by [`vega-lite`](https://github.com/vega/vega-lite). `vega-lite` gives you a grammar and rendering engine that you can use to create many different visualizations from it. For example, this is how you create a [bar chart](https://vega.github.io/vega-lite/examples/bar.html) of population by country in `vega-lite`:

```js
{
  "mark": "bar",
  "encoding": {
    "x": {"field": "country", "type": "ordinal"},
    "y": {"field": "population", "type": "quantitative"}
  }
}
```

Notice how the encoding for channels `x` and `y` are described. See `vega-lite`'s [channel definition](https://vega.github.io/vega-lite/docs/encoding.html#channel-definition) for full syntax explanation.

Although the grammar is very flexible and covers the definitions of the most common visualizations already, what you can created are still limited by what `vega-lite` supports. (`vega-lite` has a fixed set of channels.) You hit a roadblock when you want to develop a non-traditional component that cannot be described in `vega-lite`, or a traditional component with many subtle details that you struggle to describe the visualization and its interactions in `vega-lite`'s grammar. 

At this point, many people, including those who are not aware of `vega-lite` in the first place, choose to develop their own standalone components. Each component ends up having very different API. If you develop a word cloud component, how would you let user specify the `fontSize`, `color`, `text` etc.?

One common approach is to accept accessor functions as arguments, but then you punt most of the implementation responsibilities to the library consumer. The configuration is also not serializable. 

```js
{
  "fontSize": d => scale(d) // you have to setup a scale, set its domain, make domain start at 0, etc.
}
```

Then there are alternatives such as exposing a number of arbitrarily chosen fields, e.g. `fontSizeField`, `fontSizeRange`, which you have to handle inside the component. If you start from expecting `fontSize` to be using linear scale and later want to support log scale, you may have to expose new field  `fontSizeScaleType` and include new logic for creating log scale.

Later on, if you start developing a suite of components, you either have to come up with a list of common properties or naming conventions, so all of your visualization components at least work similarly. After all, this is likely to be yet another standard that only applies to your components.

#### Wouldn't it be nice if I can easily develop a component which provides an API that looks like `vega-lite` grammar?

`encodable` was created to address this need. When you already have a specific visualization in mind and know how to build it, this library helps you **make the component "encodable"** and provide standardized API similar to `vega-lite`'s [channel definition](https://vega.github.io/vega-lite/docs/encoding.html#channel-definition) for consumers to define their encoding. 

This is an example of how to define `color`, `fontSize` and `text` channels for a word cloud component that is powered by `encodable`.

```js
{
  encoding: {
    color: {
      field: 'name',
      scale: {
        scheme: 'd3Category10',
      },
      type: 'nominal',
    },
    fontSize: {
      field: 'numberOfStudents',
      scale: { range: [0, 72] },
      type: 'quantitative',
    },
    text: {
      field: 'name',
    }
  }
}
```

More specifically, the `encodable` package 

* provides typings for defining visual encoding channels for a component.
* adopts the [channel definition](https://vega.github.io/vega-lite/docs/encoding.html#channel-definition) grammar from `vega-lite` (not 100%) to define visual encoding channels as well as logic for determining smart defaults (e.g. choosing scale type based on data type, etc.) 
* parses incoming visual encoding into utility functions that helps you render the visualization component. 
* leverages `superset-ui` packages to use the number and time formatters as well as color scales.
* does NOT render the component.

<!-- ## Demo

Most recent release: https://apache-superset.github.io/encodable

Current master: https://superset-ui.netlify.com -->

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

The `factory` encapsulates `channelTypes` and `defaultEncoding`
* which are constants across all `Encoder` instance of this chart
* making it convenient to create a new `Encoder` from `encoding` because `factory.create(encoding)` only needs one argument: `encoding`.

| ChannelType | Example channel | Output types |
|----|----|----|
| `X` |  bubble chart's x-position | `number \| null` |
| `Y` |  bubble chart's y-position | `number \| null` |
| `XBand` | vertical bar chart's x-position | `number \| null` |
| `YBand` |  horizontal bar chart's y-position | `number \| null` |
| `Numeric` |  bubble chart's bubble size | `number \| null` |
| `Color` |  bubble chart's bubble color | `string \| null` |
| `Text` |  bubble chart's bubble label | `string \| null` |
| `Category` |  bubble chart's fill or not (`boolean`), pattern (`string`), font weight (`string \| number`) | `string \| boolean \| number \| null` |

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
