import { format as d3Format } from 'd3-format';
import NumberFormats from '../NumberFormats';
import createNumberFormatter from '../createNumberFormatter';
import { NumberFormatterConfig } from '../../types';

const siFormatter = d3Format(`.3~s`);
const float2PointFormatter = d3Format(`.2~f`);
const float4PointFormatter = d3Format(`.4~f`);

function formatValue(value: number) {
  if (value === 0) {
    return '0';
  }
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 1000) {
    // Normal human being are more familiar
    // with billion (B) that giga (G)
    return siFormatter(value).replace('G', 'B');
  }
  if (absoluteValue >= 1) {
    return float2PointFormatter(value);
  }
  if (absoluteValue >= 0.001) {
    return float4PointFormatter(value);
  }
  if (absoluteValue > 0.000001) {
    return `${siFormatter(value * 1000000)}µ`;
  }
  return siFormatter(value);
}

type Config = Omit<NumberFormatterConfig, 'formatFunc'> & {
  signed?: boolean;
};

const BLANK = () => '';
const ADD_PLUS = (value: number) => (value > 0 ? '+' : '');

export default function createSmartNumberFormatter({
  signed = false,
  id,
  label,
  description,
}: Config = {}) {
  const getSign = signed ? ADD_PLUS : BLANK;

  return createNumberFormatter({
    description,
    formatFunc: value => `${getSign(value)}${formatValue(value)}`,
    id: id ?? signed ? NumberFormats.signed.SMART_NUMBER : NumberFormats.SMART_NUMBER,
    label: label ?? 'Adaptive formatter',
  });
}
