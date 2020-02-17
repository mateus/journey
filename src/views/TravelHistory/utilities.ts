import {Trip} from 'types';

export function insertOrdered(trip: Trip, array: Trip[]): Trip[] {
  array.push(trip);
  array.sort(sortByStartDateDesc);
  return array;
}

export function sortByStartDateAsc(tripA: Trip, tripB: Trip) {
  return tripA.startDate < tripB.startDate ? -1 : 0;
}

export function sortByStartDateDesc(tripA: Trip, tripB: Trip) {
  return tripA.startDate > tripB.startDate ? -1 : 0;
}
