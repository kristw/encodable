export { default as Encoder } from './encoders/Encoder';
export { default as ChannelEncoder } from './encoders/ChannelEncoder';
export { default as createEncoderFactory } from './encoders/createEncoderFactory';
export { default as completeChannelDef } from './fillers/completeChannelDef';
export { default as createScaleFromScaleConfig } from './parsers/scale/createScaleFromScaleConfig';
export { default as mergeEncoding } from './utils/mergeEncoding';

export { default as OptionsManager } from './options/OptionsManager';
export * from './options/resolvers';

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
export * from './types';
