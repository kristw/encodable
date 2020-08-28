import React, { Fragment, ReactNode } from 'react';
import { Playground, PlaygroundProps } from 'docz';

export default function Demo({
  playground = false,
  width = 400,
  height = 400,
  render,
  ...restProps
}: {
  playground?: boolean;
  width?: number;
  height?: number;
  render: (props: { width: number; height: number }) => ReactNode;
} & PlaygroundProps) {
  const Wrapper = playground ? Playground : Fragment;

  return <Wrapper {...restProps}>{render({ width, height })}</Wrapper>;
}
