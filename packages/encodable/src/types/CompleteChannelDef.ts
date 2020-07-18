import { Value, Type } from './Core';
import { CompleteAxisConfig } from '../fillers/completeAxisConfig';
import { CompleteLegendConfig } from '../fillers/completeLegendConfig';
import { CompleteScaleConfig } from '../fillers/completeScaleConfig';
import { NonValueDef, XFieldDef, YFieldDef, ValueDef } from './ChannelDef';
import { CompleteFormatConfig } from '../fillers/completeFormatConfig';

export interface CompleteValueDef<Output extends Value = Value> extends ValueDef<Output> {
  axis: false;
  legend: false;
  scale: false;
  title: '';
}

export type HalfCompleteFieldDef<Output extends Value = Value> = Omit<
  NonValueDef<Output>,
  'formatType' | 'format' | 'formatInLocalTime' | 'scale' | 'title'
> & {
  type: Type;
  axis?: XFieldDef<Output>['axis'] | YFieldDef<Output>['axis'];
  scale: CompleteScaleConfig<Output>;
  title: string;
} & CompleteFormatConfig;

export type HalfCompleteChannelDef<Output extends Value = Value> =
  | CompleteValueDef<Output>
  | HalfCompleteFieldDef<Output>;

export type CompleteFieldDef<Output extends Value = Value> = Omit<
  NonValueDef<Output>,
  'title' | 'axis' | 'scale' | 'title'
> & {
  type: Type;
  axis: CompleteAxisConfig;
  legend: CompleteLegendConfig;
  scale: CompleteScaleConfig<Output>;
  title: string;
};

export type CompleteChannelDef<Output extends Value = Value> =
  | CompleteValueDef<Output>
  | CompleteFieldDef<Output>;
