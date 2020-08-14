export type ColorSchemeType = 'categorical' | 'sequential' | 'diverging';

type BaseColorScheme<T extends ColorSchemeType> = {
  /** scheme type */
  type: T;
  /** id of this scheme */
  id: string;
  /** human-friendly name to refer to */
  label?: string;
  /** more description (if any) */
  description?: string;
};

export type ColorInterpolator = (t: number) => string;

export type ContinuousScheme<T extends ColorSchemeType> = BaseColorScheme<T> &
  (
    | {
        /** color palette */
        colors: readonly string[] | readonly (readonly string[])[];
        /** color interpolator function */
        interpolator?: ColorInterpolator;
      }
    | {
        colors?: readonly string[] | readonly (readonly string[])[];
        interpolator: ColorInterpolator;
      }
  );

export type CategoricalScheme = BaseColorScheme<'categorical'> & {
  colors: readonly string[];
};

export type SequentialScheme = ContinuousScheme<'sequential'>;

export type DivergingScheme = ContinuousScheme<'diverging'>;

export type ColorScheme = CategoricalScheme | SequentialScheme | DivergingScheme;
