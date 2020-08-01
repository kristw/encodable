import { addSign } from '../utils/prefix';

const unsigned = {
  CURRENCY: '$,.2f',
  CURRENCY_ROUND: '$,d',
  FLOAT_1_POINT: ',.1f',
  FLOAT_2_POINT: ',.2f',
  FLOAT_3_POINT: ',.3f',
  FLOAT: ',.2f',
  INTEGER: ',d',
  PERCENT_1_POINT: ',.1%',
  PERCENT_2_POINT: ',.2%',
  PERCENT_3_POINT: ',.3%',
  PERCENT: ',.2%',
  SI_1_DIGIT: '.1s',
  SI_2_DIGIT: '.2s',
  SI_3_DIGIT: '.3s',
  SI: '.3s',
  SMART_NUMBER: 'SMART_NUMBER',
};

type FormatName = keyof typeof unsigned;

const signed = Object.entries(unsigned).reduce((prev, [key, value]) => {
  // eslint-disable-next-line no-param-reassign
  prev[key as FormatName] = addSign(value);
  return prev;
}, {} as Record<FormatName, string>);

export default {
  ...unsigned,
  signed,
};
