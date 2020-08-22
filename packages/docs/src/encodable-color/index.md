---
name: "@encodable/color"
route: "/encodable-color"
---

# @encodable/color

[![Version](https://img.shields.io/npm/v/@encodable/color.svg?style=flat)](https://img.shields.io/npm/v/@encodable/color.svg?style=flat)
[![David (path)](https://img.shields.io/david/kristw/encodable.svg?path=packages%2Fencodable-color&style=flat-square)](https://david-dm.org/kristw/encodable?path=packages/encodable-color)

Utilities for managing color schemes and color scales.
Built on top of D3.

## Install

```sh
npm install @encodable/color global-box
```

## Example usage

```ts
import { getColorSchemeRegistry } from '@encodable/color';

/* Get color schemes by name */
getColorSchemeRegistry().get(schemeName);
// Get categorical scheme
getColorSchemeRegistry().categorical.get(schemeName);
// Get sequential scheme
getColorSchemeRegistry().sequential.get(schemeName);
// Get diverging scheme
getColorSchemeRegistry().diverging.get(schemeName);

// Register color scheme
getColorSchemeRegistry().register({
  type: 'categorical',
  id: 'my-scheme',
  colors: [...],
});
```

The library also includes all schemes from `d3-scale-chromatic` by default.
