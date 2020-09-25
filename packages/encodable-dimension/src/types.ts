export interface TextStyle {
  font?: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontStyle?: string;
  fontWeight?: string | number;
  letterSpacing?: string | number;
}

export type MarginOrPadding = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type Margin = MarginOrPadding;

export type WithMargin = {
  margin?: Partial<Margin>;
};

export type Padding = MarginOrPadding;

export type WithPadding = {
  padding?: Partial<Padding>;
};

export interface Dimension {
  width: number;
  height: number;
}
