import React, { ReactNode, CSSProperties, useMemo } from 'react';

export type FrameProps = {
  width: number;
  height: number;
  children: ReactNode;
  inline?: boolean;
  background?: CSSProperties['background'];
};

export default function ({ width, height, children, inline = true, background }: FrameProps) {
  const style = useMemo(() => {
    const output: CSSProperties = {
      width,
      height,
      borderRadius: 8,
      verticalAlign: 'middle',
    };
    if (inline) output.display = 'inline-block';
    if (background) output.background = background;
    return output;
  }, [inline, background, width, height]);
  return <div style={style}>{children}</div>;
}
