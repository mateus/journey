import moment from 'moment';

import {Trip} from 'types';
import {isFutureDate, isTodayDate} from 'utilities/dates';

export interface TripsByYear {
  [key: string]: Trip[];
}

export function tripsByYear(trips: Trip[]): TripsByYear {
  return trips.reduce((map, trip) => {
    const year = moment(trip.endDate).year();
    if (map[year]) {
      map[year] = insertOrdered(trip, map[year], {desc: true});
    } else {
      map[year] = [trip];
    }
    return map;
  }, {} as {[key: string]: Trip[]});
}

export function upcomingTrips(trips: Trip[]) {
  return trips
    .filter(({endDate}) => isFutureDate(endDate) || isTodayDate(endDate))
    .sort(sortByEndDateAsc);
}

export function insertOrdered(
  trip: Trip,
  array: Trip[],
  opt = {desc: false},
): Trip[] {
  const sortMethod = opt.desc ? sortByStartDateDesc : sortByStartDateAsc;
  array.push(trip);
  array.sort(sortMethod);
  return array;
}

export function sortByStartDateAsc(tripA: Trip, tripB: Trip) {
  return Number(tripA.startDate) < Number(tripB.startDate) ? -1 : 0;
}

export function sortByStartDateDesc(tripA: Trip, tripB: Trip) {
  return Number(tripA.startDate) > Number(tripB.startDate) ? -1 : 0;
}

export function sortByEndDateAsc(tripA: Trip, tripB: Trip) {
  return Number(tripA.endDate) < Number(tripB.endDate) ? -1 : 0;
}

export function sortByEndDateDesc(tripA: Trip, tripB: Trip) {
  return Number(tripA.endDate) > Number(tripB.endDate) ? -1 : 0;
}
