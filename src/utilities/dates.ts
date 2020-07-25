import moment from 'moment';

export function isPastDate(date: Date) {
  const today = moment().startOf('day');
  return moment(date).diff(today, 'days') < 0;
}

export function isFutureDate(date: Date) {
  const today = moment().startOf('day');
  return moment(date).diff(today, 'days') > 0;
}

export function isTodayDate(date: Date) {
  const today = moment().startOf('day');
  return moment(date).diff(today, 'days') === 0;
}

export function isValidDate(date: string) {
  return Boolean(Date.parse(date));
}
