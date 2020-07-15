/** See https://vega.github.io/vega-lite/docs/axis.html */

import { Axis as VegaLiteAxis } from './VegaLite';

/** Axis orientation */
export type AxisOrient = 'top' | 'bottom' | 'left' | 'right';

export type LabelOverlapStrategyFlat = {
  strategy: 'flat';
};

export type LabelOverlapStrategyRotate = {
  strategy: 'rotate';
  labelAngle: number;
};

export type LabelOverlapStrategy = LabelOverlapStrategyFlat | LabelOverlapStrategyRotate;

/** Strategy for handling label overlap */
export type LabelOverlapType = 'auto' | LabelOverlapStrategy['strategy'] | LabelOverlapStrategy;

export interface BaseAxisConfig
  extends Pick<
    VegaLiteAxis,
    | 'labelAngle'
    | 'labelFlush'
    | 'tickCount'
    | 'ticks'
    | 'title'
    | 'titlePadding'
    | 'values'
    | 'format'
    | 'formatType'
    | 'formatInLocalTime'
  > {
  /** Strategy for handling label overlap */
  labelOverlap?: LabelOverlapType;
  // Override to allow only number and disable ConditionalAxisNumber
  labelPadding?: number;
  orient?: AxisOrient;
  // Override to allow only number and disable ConditionalAxisNumber
  tickSize?: number;
}

export interface XAxisConfig extends BaseAxisConfig {
  orient?: 'top' | 'bottom';
}

export interface YAxisConfig extends BaseAxisConfig {
  orient?: 'left' | 'right';
  labelOverlap?: Exclude<LabelOverlapType, 'rotate' | LabelOverlapStrategyRotate>;
}

export type AxisConfig = XAxisConfig | YAxisConfig;

export interface WithXAxis {
  axis?: Partial<XAxisConfig> | boolean;
}

export interface WithYAxis {
  axis?: Partial<YAxisConfig> | boolean;
}

export type WithAxis = WithXAxis | WithYAxis;
