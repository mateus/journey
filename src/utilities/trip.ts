import moment from 'moment';
import faker from 'faker';

import {Trip} from 'types';

export function mockTrip(trip: Partial<Trip>): Trip {
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
