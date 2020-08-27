---
name: Creating a legend
menu: Guides
---

# Creating a legend

`encoder.getLegendInformation(dataset)` generates metadata for rendering legend.

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
