import moment from 'moment';

import {Trip} from 'types';
import {isPastDate, isFutureDate, isTodayDate} from 'utilities/dates';

export function tripsByYear(trips: Trip[]): Record<string, Trip[]> {
  return trips.reduce((map, trip) => {
    const year = moment(trip.endDate).year();
    if (map[year]) {
      map[year] = insertOrdered(trip, map[year], {desc: true});
    } else {
      map[year] = [trip];
    }
    return map;
  }, {} as Record<string, Trip[]>);
}

export function upcomingTrips(trips: Trip[]) {
  return trips
    .filter(({startDate}) => isFutureDate(startDate))
    .sort(sortByStartDateAsc);
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

export function earliestTrip(trips: Trip[]): Trip {
  return trips.sort(
    (tripA, tripB) =>
      Number(new Date(tripA.startDate)) - Number(new Date(tripB.startDate)),
  )[0];
}

export function listOfCountriesVisited(trips: Trip[]): Trip['countryCode'][] {
  const pastTrips = filterUpcomingTrips(trips);
  return Array.from(new Set(pastTrips.map(({countryCode}) => countryCode)));
}

export function listOfPlacesVisited(trips: Trip[]): Trip['location'][] {
  const pastTrips = filterUpcomingTrips(trips);
  return Array.from(new Set(pastTrips.map(({location}) => location)));
}

export function filterUpcomingTrips(trips: Trip[]): Trip[] {
  return trips.filter(
    ({startDate}) => isPastDate(startDate) || isTodayDate(startDate),
  );
}
