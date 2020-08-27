import { DefaultOutput, FieldType } from '../Core';
import { CompleteAxisConfig } from '../../fillers/completeAxisConfig';
import { CompleteLegendConfig } from '../../fillers/completeLegendConfig';
import { CompleteScaleConfig } from '../../fillers/completeScaleConfig';
import { NonValueDef, XFieldDef, YFieldDef, ValueDef } from '../ChannelDef';
import { CompleteFormatConfig } from '../../fillers/completeFormatConfig';

export interface CompleteValueDef<Output extends DefaultOutput = DefaultOutput>
  extends ValueDef<Output> {
  axis: false;
  legend: false;
  scale: false;
  title: '';
}

export type HalfCompleteFieldDef<Output extends DefaultOutput = DefaultOutput> = Omit<
  NonValueDef<Output>,
  'formatType' | 'format' | 'formatInLocalTime' | 'scale' | 'title'
> & {
  type: FieldType;
  axis?: XFieldDef<Output>['axis'] | YFieldDef<Output>['axis'];
  scale: CompleteScaleConfig<Output>;
  title: string;
} & CompleteFormatConfig;

export type HalfCompleteChannelDef<Output extends DefaultOutput = DefaultOutput> =
  | CompleteValueDef<Output>
  | HalfCompleteFieldDef<Output>;

export type CompleteFieldDef<Output extends DefaultOutput = DefaultOutput> = Omit<
  NonValueDef<Output>,
  'title' | 'axis' | 'scale' | 'title'
> & {
  type: FieldType;
  axis: CompleteAxisConfig;
  legend: CompleteLegendConfig;
  scale: CompleteScaleConfig<Output>;
  title: string;
};

export type CompleteChannelDef<Output extends DefaultOutput = DefaultOutput> =
  | CompleteValueDef<Output>
  | CompleteFieldDef<Output>;
