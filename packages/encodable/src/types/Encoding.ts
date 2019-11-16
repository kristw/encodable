import { ChannelTypeToDefMap } from './Channel';
import ChannelEncoder from '../encoders/ChannelEncoder';

/**
 * { [channelName]: [ChannelType, Output, multiple?] }
 */
export type EncodingConfig = {
  [k in string]:
    | ['X' | 'Y' | 'XBand' | 'YBand' | 'Numeric', number | null, 'multiple'?]
    | ['Color' | 'Text', string | null, 'multiple'?]
    | ['Category', string | boolean | null, 'multiple'?];
};

export type DeriveChannelTypes<Config extends EncodingConfig> = {
  readonly [k in keyof Config]: Config[k]['0'];
};

export type DeriveChannelOutputs<Config extends EncodingConfig> = {
  readonly [k in keyof Config]: Config[k]['2'] extends 'multiple'
    ? Config[k]['1'][]
    : Config[k]['1'];
};

export type DeriveEncoding<Config extends EncodingConfig> = {
  [k in keyof Config]: Config[k]['2'] extends 'multiple'
    ? ChannelTypeToDefMap<Config[k]['1']>[Config[k]['0']][]
    : ChannelTypeToDefMap<Config[k]['1']>[Config[k]['0']];
};

export type DeriveChannelEncoders<Config extends EncodingConfig> = {
  readonly [k in keyof Config]: Config[k]['2'] extends 'multiple'
    ? ChannelEncoder<ChannelTypeToDefMap<Config[k]['1']>[Config[k]['0']], Config[k]['1']>[]
    : ChannelEncoder<ChannelTypeToDefMap<Config[k]['1']>[Config[k]['0']], Config[k]['1']>;
};

export type DeriveSingleChannelEncoder<
  Config extends EncodingConfig,
  k extends keyof Config = keyof Config
> = ChannelEncoder<ChannelTypeToDefMap<Config[k]['1']>[Config[k]['0']], Config[k]['1']>;
