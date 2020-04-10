export { default as Encoder } from './encoders/Encoder';
export { default as ChannelEncoder } from './encoders/ChannelEncoder';
export { default as createEncoderFactory } from './encoders/createEncoderFactory';
export { default as completeChannelDef } from './fillers/completeChannelDef';
export { default as createScaleFromScaleConfig } from './parsers/scale/createScaleFromScaleConfig';
export { default as mergeEncoding } from './utils/mergeEncoding';

// Export type guards
export {
  isFieldDef,
  isNonValueDef,
  isTypedFieldDef,
  isValueDef,
  isScaleFieldDef,
  isPositionFieldDef,
} from './typeGuards/ChannelDef';

export { isCompleteFieldDef, isCompleteValueDef } from './typeGuards/CompleteChannelDef';

// Export types
export * from './types/Axis';
export * from './types/Channel';
export * from './types/ChannelDef';
export * from './types/Data';
export * from './types/Encoding';
export * from './types/Legend';
export * from './types/Scale';
export * from './types/VegaLite';
