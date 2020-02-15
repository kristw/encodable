import { Type } from './VegaLite';
import { ChannelInput } from './Channel';
import { EncodingConfig, DeriveSingleChannelEncoder } from './Encoding';

export type Legend = {};

export interface WithLegend {
  legend?: boolean | Legend;
}

interface BaseLegendGroupInformation<Config extends EncodingConfig> {
  field: string;
  channelEncoders: DeriveSingleChannelEncoder<Config, keyof Config>[];
  createLegendItems: (
    domain: ChannelInput[],
  ) => {
    input: ChannelInput;
    output: Partial<{ [k in keyof Config]: Config[k]['1'] }>;
  }[];
}

export interface NominalLegendGroupInformation<Config extends EncodingConfig>
  extends BaseLegendGroupInformation<Config> {
  type: 'nominal';
  items: {
    input: ChannelInput;
    output: Partial<{ [k in keyof Config]: Config[k]['1'] }>;
  }[];
}

export interface NonNominalLegendGroupInformation<Config extends EncodingConfig>
  extends BaseLegendGroupInformation<Config> {
  type: Exclude<Type, 'nominal'>;
}

export type LegendGroupInformation<Config extends EncodingConfig> =
  | NominalLegendGroupInformation<Config>
  | NonNominalLegendGroupInformation<Config>;
