## 🎭 encodable / API / `ChannelEncoder`

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
encoder.getDomainFromDataset([{ speed: 10 }, { speed: 20 }]); // [10, 20]
encoder.scale // scale function (e.g. d3.scaleLinear, d3.scaleLog, depends on the definition)
```
