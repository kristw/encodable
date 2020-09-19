---
name: "@encodable/dimension"
menu: Submodule API
route: "/encodable-dimension"
---

# @encodable/dimension

[![Version](https://img.shields.io/npm/v/@encodable/dimension.svg?style=flat)](https://img.shields.io/npm/v/@encodable/dimension.svg?style=flat)
[![David (path)](https://img.shields.io/david/kristw/encodable.svg?path=packages%2Fencodable-dimension&style=flat-square)](https://david-dm.org/kristw/encodable?path=packages/encodable-dimension)

Utilities for managing dimension.

## Install

```sh
npm install @encodable/dimension
```

## APIs

### getTextDimension(...)

Get dimension (width & height) of a rendered text.

#### Signature

```ts
function getTextDimension(
  input: {
    className?: string;
    container?: HTMLElement;
    style?: TextStyle;
    text: string;
  },
  defaultDimension?: Dimension
): Dimension;
```

#### Example

```ts
import { getTextDimension } from '@encodable/dimension';

getTextDimension({ text: 'abcdef' });
```

### getMultipleTextDimension(...)

Same with `getTextDimension()` but takes an array of strings which is more efficient for batch computation.

### computeMaxFontSize(...)

Compute maximum font size to fit in the the given container.

### parseLength()

Parse length from string or number;

### mergeMargin(...)

Merge two margin objects

### mergePadding(...)

Merge two padding objects
