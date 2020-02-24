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
  const startDate = trip?.startDate;
  const endDate = trip?.endDate;

  const today = moment();
  const fakeTrip: QueryTripCollection = {
    id: faker.random.uuid(),
    countryCode: faker.address.countryCode(),
    completed: faker.random.boolean(),
    notes: faker.lorem.sentences(),
    location: faker.address.city(),
    startDate: {
      // Not trully Seconds and Nanoseconds (both the same)
      seconds: startDate ? moment(new Date(startDate)).unix() : today.unix(),
      nanoseconds: startDate
        ? moment(new Date(startDate)).unix()
        : today.unix(),
    },
    endDate: {
      // Not trully Seconds and Nanoseconds (both the same)
      seconds: endDate ? moment(new Date(endDate)).unix() : today.unix(),
      nanoseconds: endDate
        ? moment(new Date(endDate)).unix()
        : today.add(3, 'days').unix(),
    },
  };

  return fakeTrip;
}
