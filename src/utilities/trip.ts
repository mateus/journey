import moment from 'moment';
import faker from 'faker';

import {Trip} from 'types';

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

export function mockTrip(trip: Partial<Trip> = fakeTrip): Trip {
  return {
    ...fakeTrip,
    ...trip,
  };
}
