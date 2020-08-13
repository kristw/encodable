type BaseColorScheme<T> = {
  type: T;
  id: string;
  label?: string;
  description?: string;
  colors: string[];
};

export type CategoricalScheme = BaseColorScheme<'categorical'>;

export type SequentialScheme = BaseColorScheme<'sequential'>;

export type DivergingScheme = BaseColorScheme<'diverging'>;

export type ColorScheme = CategoricalScheme | SequentialScheme | DivergingScheme;
