## @encodable/format

[![Version](https://img.shields.io/npm/v/@encodable/format.svg?style=flat)](https://img.shields.io/npm/v/@encodable/format.svg?style=flat)
[![David (path)](https://img.shields.io/david/kristw/encodable.svg?path=packages%2Fencodable-format&style=flat-square)](https://david-dm.org/kristw/encodable?path=packages/encodable-format)

Utilities for managing time and number formats.
Built on top of D3 formats and support customizing your own formatters.

### Install

```sh
npm install @encodable/format global-box
```

### Example usage

```ts
import {
  getTimeFormat,
  formatTime,
  getNumberFormat,
  formatNumber,
  getNumberFormatterRegistry,
} from '@encodable/format';

// Get number format function
const numFormatFn = getNumberFormat('.2f');
// Get time format function
const timeFormatFn = getTimeFormat('%Y-%m-%d');

// or just format directly

formatNumber('.2f', 200); // 200.00
formatTime('%Y-%m-%d', new Date()); // 2020-08-15

// can customize by adding your own formatters
// or override the d3 ones

getNumberFormatterRegistry().registerValue('my-format', (x) => `haha:${x}`);
formatNumber('my-format', 200); // haha:200

```
