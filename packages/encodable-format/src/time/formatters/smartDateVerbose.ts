import createMultiTimeFormatter from '../factories/createMultiTimeFormatter';

const smartDateFormatter = createMultiTimeFormatter({
  id: 'smart_date_verbose',
  label: 'Verbose Adaptative Formatting',
  formats: {
    millisecond: '%a %b %d, %I:%M:%S.%L %p',
    second: '%a %b %d, %I:%M:%S %p',
    minute: '%a %b %d, %I:%M %p',
    hour: '%a %b %d, %I %p',
    day: '%a %b %-e',
    week: '%a %b %-e',
    month: '%b %Y',
    year: '%Y',
  },
});

export default smartDateFormatter;
