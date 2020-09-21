import appleStock from '@vx/mock-data/lib/mocks/appleStock';

export default appleStock.map(({ date, close }) => ({
  date: new Date(date),
  close,
}));
