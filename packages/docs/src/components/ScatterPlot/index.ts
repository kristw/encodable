/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { select as d3Select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { PlainObject } from 'encodable';
import reactify, { ReactifyProps } from '../reactify';
import { ScatterPlotEncoding, scatterPlotEncoderFactory } from './Encoder';

type ScatterPlotProps = {
  width: number;
  height: number;
  data: PlainObject[];
  encoding?: Partial<ScatterPlotEncoding>;
} & ReactifyProps;

const padding = 8;
const margin = { top: 24, right: 20, bottom: 36, left: 40 };

function ScatterPlot(container: HTMLDivElement, props: ScatterPlotProps) {
  const { width, height, encoding, data } = props;
  const encoder = scatterPlotEncoderFactory.create(encoding);
  encoder.setDomainFromDataset(data);
  const { channels } = encoder;

  const $container = d3Select(container);
  // clear
  $container.selectAll('*').remove();

  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const svg = $container
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `[0, 0, ${width}, ${height}]`)
    .append('g')
    .attr('transform', `translate(${padding},${padding})`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const xScale: any = channels.x.scale!;
  xScale.range([margin.left, innerWidth - margin.right]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yScale: any = channels.y.scale!;
  yScale.range([innerHeight - margin.bottom, margin.top]);

  // xAxis
  svg
    .append('g')
    .attr('transform', `translate(0,${innerHeight - margin.bottom})`)
    .call(axisBottom(xScale).ticks(innerWidth / 80))
    .call(g =>
      g
        .append('text')
        .classed('axis-title', true)
        .attr('x', innerWidth)
        .attr('y', margin.bottom - 4)
        .attr('text-anchor', 'end')
        .text(channels.x.axis ? channels.x.axis.getTitle() ?? '' : ''),
    );

  // yAxis
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(axisLeft(yScale))
    .call(g =>
      g
        .append('text')
        .classed('axis-title', true)
        .attr('x', -margin.left)
        .attr('y', 10)
        .attr('text-anchor', 'start')
        .text(channels.y.axis ? channels.y.axis.getTitle() ?? '' : ''),
    );

  // // grid
  svg
    .append('g')
    .attr('stroke', '#DBD1AA')
    .attr('stroke-opacity', 0.5)
    .call(g =>
      g
        .append('g')
        .selectAll('line')
        .data(xScale.ticks())
        .join('line')
        .attr('x1', d => 0.5 + xScale(d))
        .attr('x2', d => 0.5 + xScale(d))
        .attr('y1', margin.top)
        .attr('y2', innerHeight - margin.bottom),
    )
    .call(g =>
      g
        .append('g')
        .selectAll('line')
        .data(yScale.ticks())
        .join('line')
        .attr('y1', d => 0.5 + yScale(d))
        .attr('y2', d => 0.5 + yScale(d))
        .attr('x1', margin.left)
        .attr('x2', innerWidth - margin.right),
    );

  svg
    .append('g')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('stroke', d => channels.stroke.encodeDatum(d, '#222'))
    .attr('fill', d => channels.fill.encodeDatum(d, 'none'))
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 3);

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('dy', '0.35em')
    .attr('x', d => xScale(d.x) + 7)
    .attr('y', d => yScale(d.y))
    .text(d => channels.label.getValueFromDatum(d));

  svg.selectAll('path.domain').attr('stroke', '#746F5A');
  svg.selectAll('g.tick line').attr('stroke', '#746F5A');
  svg
    .selectAll('g.tick text')
    .style('font-family', 'Raleway, "Helvetica Neue", Helvetica, sans-serif')
    .attr('fill', '#746F5A');
  svg
    .selectAll('text.axis-title')
    .style('font-family', 'Raleway, "Helvetica Neue", Helvetica, sans-serif')
    .style('font-weight', '700')
    .attr('fill', '#746F5A');
}

export default reactify(ScatterPlot);
