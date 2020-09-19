---
name: Encoder
menu: Encodable API
---

# Encoder

An `Encoder` is a utility class created once per chart type.

- It consists of one or more `ChannelEncoder`
- It takes users' definitions of the channels (`vega-lite` syntax), then resolves ambiguity and
  produce complete definition and actionable utility functions.
