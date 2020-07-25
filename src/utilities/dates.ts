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

export function numberOfDaysBetween(dateA: Date, dateB: Date) {
  const momentDateA = moment(dateA);
  const momentDateB = moment(dateB);
  return momentDateB.diff(momentDateA, 'days') + 1;
}
