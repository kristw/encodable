## 🎭 encodable / API / `createScaleFromScaleConfig(...)`

Function for parsing scales from configuration object into D3 scales as well as connecting to `@encodable/color` to get color schemes by name. Support all types of scale that D3 has.

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
'zero';
```
