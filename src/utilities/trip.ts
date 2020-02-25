import moment from 'moment';
import faker from 'faker';

import {Trip, QueryTripCollection} from 'types';

export const DEFAULT_TRIP_LENGTH = 3;

export function mockTrip(trip?: Partial<Trip>): Trip {
  const today = moment();
  const fakeTrip: Trip = {
    id: faker.random.uuid(),
    countryCode: faker.address.countryCode(),
    completed: faker.random.boolean(),
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
