## 🎭 encodable / API / `createScaleFromScaleConfig(...)`

Function for parsing scales from configuration object into D3 scales as well as connecting to
`@superset-ui/colors` to get color schemes by name. Support most types of scale that D3/vega-lite
has. See [vega-lite's scale documentation](https://vega.github.io/vega-lite/docs/scale.html) for
more details.

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
'domain';
'range';
'reverse';
'align';
'base';
'clamp';
'constant';
'exponent';
'interpolate'; // add placeholder to be implemented
'nice';
'padding';
'paddingInner';
'paddingOuter';
'reverse';
'round';
'scheme';
'namespace';
'zero';
```
