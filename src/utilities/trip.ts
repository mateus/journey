import moment from 'moment';
import faker from 'faker';
import PapaParse from 'papaparse';

import {Trip, QueryTripCollection} from 'types';
import {isValidDate} from 'utilities/dates';
import {getCountryByLabel, DEFAULT_COUNTRY} from 'utilities/countries';

export const DEFAULT_TRIP_LENGTH = 3;

export function mockTrip(trip?: Partial<Trip>): Trip {
  const today = moment();
  const fakeTrip: Trip = {
    id: faker.random.uuid(),
    countryCode: faker.address.countryCode(),
    notes: faker.lorem.sentences(),
    location: faker.address.city(),
    startDate: today.toDate(),
    endDate: today.add(3, 'days').toDate(),
  };

  return {
    ...fakeTrip,
    ...trip,
  };
}

export function mockTripCollection(trip?: Partial<Trip>): QueryTripCollection {
  const mockedTrip = mockTrip(trip);
  const today = moment();
  const startDate = trip?.startDate;
  const endDate = trip?.endDate;

  const epochStartDateSeconds = startDate
    ? moment(new Date(startDate)).unix()
    : today.unix();

  const epochEndDateSeconds = endDate
    ? moment(new Date(endDate)).unix()
    : today.add(3, 'days').unix();

  return {
    ...mockedTrip,
    startDate: {
      // Not trully Seconds and Nanoseconds (both are the same here)
      seconds: epochStartDateSeconds,
      nanoseconds: epochStartDateSeconds,
    },
    endDate: {
      // Not trully Seconds and Nanoseconds (both are the same here)
      seconds: epochEndDateSeconds,
      nanoseconds: epochEndDateSeconds,
    },
  };
}

export function csvToTrips({data}: PapaParse.ParseResult): Trip[] {
  const columns = data
    .shift()
    .map((col: string) => col.toLocaleLowerCase().trim());
  const indexMap = {
    startDate: columns.indexOf('start date'),
    endDate: columns.indexOf('end date'),
    countryCode: columns.indexOf('country'),
    location: columns.indexOf('location'),
    notes: columns.indexOf('notes'),
  };

  if (!hasAllRequiredColumns(indexMap)) return [];

  const filtedData = data.filter(
    (row) =>
      isValidDate(row[indexMap.startDate]) &&
      isValidDate(row[indexMap.endDate]) &&
      !hasEmptyValues(row, indexMap),
  );

  return filtedData.map<Trip>((row) => {
    const startDate = moment(row[indexMap.startDate].trim()).toDate();
    const endDate = moment(row[indexMap.endDate].trim()).toDate();
    const countryCode =
      getCountryByLabel(row[indexMap.countryCode].trim())?.countryCode ||
      DEFAULT_COUNTRY.countryCode;
    const location = row[indexMap.location].trim();
    const notes = row[indexMap.notes].trim();

    const result = {
      startDate,
      endDate,
      countryCode,
      location,
    };

    if (notes) {
      return {...result, notes};
    }
    return result;
  });
}

function hasEmptyValues(values: string[], indexMap: {[id: string]: number}) {
  return values.some((value, index) => {
    if (indexMap.notes === index) return false;
    return value.trim() === '';
  });
}

function hasAllRequiredColumns(map: {[id: string]: number}) {
  return Object.keys(map).every((key) => map[key] >= 0);
}
