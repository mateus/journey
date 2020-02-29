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

  const fakeTrip: QueryTripCollection = {
    ...mockedTrip,
    startDate: {
      // Not trully Seconds and Nanoseconds (both the same)
      seconds: epochStartDateSeconds,
      nanoseconds: epochStartDateSeconds,
    },
    endDate: {
      // Not trully Seconds and Nanoseconds (both the same)
      seconds: epochEndDateSeconds,
      nanoseconds: epochEndDateSeconds,
    },
  };

  return fakeTrip;
}

export function csvToTrip({data}: PapaParse.ParseResult): Trip[] {
  const columns = data
    .shift()
    .map((col: string) => col.toLocaleLowerCase().trim());
  const index = {
    startDate: columns.indexOf('start date'),
    endDate: columns.indexOf('end date'),
    countryCode: columns.indexOf('country'),
    location: columns.indexOf('location'),
  };
  const filtedData = data.filter(
    (row) =>
      isValidDate(row[index.startDate]) &&
      isValidDate(row[index.endDate]) &&
      !hasEmptyValues(row),
  );
  return filtedData.map<Trip>((row) => {
    return {
      startDate: moment(row[index.startDate].trim()).toDate(),
      endDate: moment(row[index.endDate].trim()).toDate(),
      countryCode:
        getCountryByLabel(row[index.countryCode].trim())?.countryCode ||
        DEFAULT_COUNTRY.countryCode,
      location: row[index.location].trim(),
    };
  });
}

function hasEmptyValues(values: string[]) {
  return values.some((value) => value.trim() === '');
}
