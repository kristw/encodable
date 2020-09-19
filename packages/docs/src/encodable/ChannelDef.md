---
name: Channel Definition
menu: Encodable API
---

# Channel Definition

This is a subset of `vega-lite`'s
[channel definition](https://vega.github.io/vega-lite/docs/encoding.html#channel-definition).

## ValueDef

Use fixed value as channel output.

```ts
{ color: { value: 'red' } }
```

## FieldDef

Use value based on a field in the data.

```ts
{ color: { field: 'color' } }
```

Use value based on a field in the data, and may apply scale.

```ts
{
  color: {
    type: 'quantitative',
    field: 'score',
    scale: { range: ['white', 'blue'] },
  }
}
```

Or may include an axis.

```ts
{
  y: {
    type: 'quantitative',
    field: 'score',
    scale: { type: 'linear' },
    axis: { orient: 'left' }
  }
}
```
