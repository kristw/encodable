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

export type Padding = MarginOrPadding;

export interface Dimension {
  width: number;
  height: number;
}
