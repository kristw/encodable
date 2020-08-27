import { FormatMixins } from './Mixins';
import { WithScale } from './scale/ScaleConfig';
import { WithXAxis, WithYAxis } from './Axis';
import { WithLegend } from './Legend';
import { DefaultOutput, FieldType } from './Core';

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
export interface ValueDef<V extends DefaultOutput | DefaultOutput[] = DefaultOutput> {
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
  type: FieldType;
}

export type TextFieldDef = FieldDef;

export type ScaleFieldDef<Output extends DefaultOutput = DefaultOutput> = TypedFieldDef &
  WithScale<Output>;

export type MarkPropFieldDef<Output extends DefaultOutput = DefaultOutput> = ScaleFieldDef<Output> &
  WithLegend;

// PositionFieldDef is { field: 'fieldName', scale: xxx, axis: xxx }

type PositionFieldDefBase<Output extends DefaultOutput = DefaultOutput> = ScaleFieldDef<Output>;

export type XFieldDef<Output extends DefaultOutput = DefaultOutput> = PositionFieldDefBase<Output> &
  WithXAxis;

export type YFieldDef<Output extends DefaultOutput = DefaultOutput> = PositionFieldDefBase<Output> &
  WithYAxis;

export type PositionFieldDef<Output extends DefaultOutput = DefaultOutput> =
  | XFieldDef<Output>
  | YFieldDef<Output>;

export type MarkPropChannelDef<Output extends DefaultOutput = DefaultOutput> =
  | MarkPropFieldDef<Output>
  | ValueDef<Output>;

export type TextChannelDef<Output extends DefaultOutput = DefaultOutput> =
  | TextFieldDef
  | ValueDef<Output>;

export type ChannelDef<Output extends DefaultOutput = DefaultOutput> =
  | ValueDef<Output>
  | XFieldDef<Output>
  | YFieldDef<Output>
  | MarkPropFieldDef<Output>
  | TextFieldDef;

/** Channel definitions that are not constant value */
export type NonValueDef<Output extends DefaultOutput = DefaultOutput> = Exclude<
  ChannelDef<Output>,
  ValueDef<Output>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyChannelDef = ChannelDef<any>;

/** Pattern for extracting output type from channel definition */
export type InferChannelOutput<Def extends AnyChannelDef> = Def extends ChannelDef<infer Output>
  ? Output
  : DefaultOutput;
