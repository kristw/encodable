import ChannelEncoder from './ChannelEncoder';
import { CompleteAxisConfig } from '../fillers/completeAxisConfig';
import { Value, ChannelDef, ChannelInput } from '../types';
import { StringLike } from '../types/internal/Base';
import parseDateTime from '../parsers/parseDateTime';
import inferElementTypeFromUnionOfArrayTypes from '../utils/inferElementTypeFromUnionOfArrayTypes';
import { isDateTime } from '../typeGuards/DateTime';
import createFormatter from '../parsers/format/createFormatter';

export default class ChannelEncoderAxis<
  Def extends ChannelDef<Output>,
  Output extends Value = Value
> {
  readonly channelEncoder: ChannelEncoder<Def, Output>;

  readonly config: Exclude<CompleteAxisConfig, false>;

  readonly formatValue: (value: ChannelInput | StringLike) => string;

  constructor(channelEncoder: ChannelEncoder<Def, Output>) {
    this.channelEncoder = channelEncoder;
    this.config = channelEncoder.definition.axis as Exclude<CompleteAxisConfig, false>;
    this.formatValue = createFormatter(this.config);
  }

  getTitle() {
    return this.config.title;
  }

  hasTitle() {
    const { title } = this.config;

    return title !== null && typeof title !== 'undefined' && title !== '';
  }

  getTickLabels() {
    const { tickCount, values } = this.config;

    if (typeof values !== 'undefined') {
      return inferElementTypeFromUnionOfArrayTypes(values).map(v =>
        this.formatValue(isDateTime(v) ? parseDateTime(v) : v),
      );
    }

    const { scale } = this.channelEncoder;
    if (scale && 'domain' in scale) {
      const ticks: (string | number | Date | StringLike)[] =
        'ticks' in scale ? scale.ticks(tickCount) : scale.domain();
      return ticks.map(this.formatValue);
    }

    return [];
  }
}
