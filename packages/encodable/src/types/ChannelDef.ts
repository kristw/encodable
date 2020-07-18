import { FormatMixins } from './Mixins';
import { WithScale } from './scale/ScaleConfig';
import { WithXAxis, WithYAxis } from './Axis';
import { WithLegend } from './Legend';
import { Value, Type } from './Core';

export type PropertyValue =
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }
  | boolean
  | null
  | undefined;

// Override: exclude gradient type
/**
 * Definition object for a constant value of an encoding channel.
 */
export interface ValueDef<V extends Value | Value[] = Value> {
  /**
   * A constant value in visual domain (e.g., `"red"` / `"#0099ff"` / [gradient definition](https://vega.github.io/vega-lite/docs/types.html#gradient) for color, values between `0` to `1` for opacity).
   */
  value: V;
}

export interface FieldDef extends FormatMixins {
  field: string;
  title?: string;
  /** not used at the moment */
  bin?: boolean;
}

export interface TypedFieldDef extends FieldDef {
  type: Type;
}

export type TextFieldDef = FieldDef;

export type ScaleFieldDef<Output extends Value = Value> = TypedFieldDef & WithScale<Output>;

export type MarkPropFieldDef<Output extends Value = Value> = ScaleFieldDef<Output> & WithLegend;

// PositionFieldDef is { field: 'fieldName', scale: xxx, axis: xxx }

type PositionFieldDefBase<Output extends Value = Value> = ScaleFieldDef<Output>;

export type XFieldDef<Output extends Value = Value> = PositionFieldDefBase<Output> & WithXAxis;

export type YFieldDef<Output extends Value = Value> = PositionFieldDefBase<Output> & WithYAxis;

export type PositionFieldDef<Output extends Value = Value> = XFieldDef<Output> | YFieldDef<Output>;

export type MarkPropChannelDef<Output extends Value = Value> =
  | MarkPropFieldDef<Output>
  | ValueDef<Output>;

export type TextChannelDef<Output extends Value = Value> = TextFieldDef | ValueDef<Output>;

export type ChannelDef<Output extends Value = Value> =
  | ValueDef<Output>
  | XFieldDef<Output>
  | YFieldDef<Output>
  | MarkPropFieldDef<Output>
  | TextFieldDef;

/** Channel definitions that are not constant value */
export type NonValueDef<Output extends Value = Value> = Exclude<
  ChannelDef<Output>,
  ValueDef<Output>
>;

/** Pattern for extracting output type from channel definition */
export type ExtractChannelOutput<Def> = Def extends ChannelDef<infer Output> ? Output : never;
