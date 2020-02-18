import React from 'react';
import moment from 'moment';

import {mockTrip} from 'utilities';

import {
  insertOrdered,
  sortByStartDateAsc,
  sortByStartDateDesc,
} from '../utilities';

describe('insertOrdered()', () => {
  it('inserts Trip into an array of Trips and orders it', () => {
    const arrayOfTrips = [
      mockTrip({startDate: moment(new Date('01/01/2020')).toDate()}),
      mockTrip({startDate: moment(new Date('06/06/2020')).toDate()}),
      mockTrip({startDate: moment(new Date('12/12/2020')).toDate()}),
    ];
    const newTrip = mockTrip({
      startDate: moment(new Date('08/08/2020')).toDate(),
    });
    const expected = [
      mockTrip({startDate: moment(new Date('01/01/2020')).toDate()}),
      mockTrip({startDate: moment(new Date('06/06/2020')).toDate()}),
      mockTrip({
        startDate: moment(new Date('08/08/2020')).toDate(),
      }),
      mockTrip({startDate: moment(new Date('12/12/2020')).toDate()}),
    ];

    expect(insertOrdered(newTrip, arrayOfTrips)).toStrictEqual(expected);
  });

  it('inserts Trip into an array of Trips and orders it descending', () => {
    const arrayOfTrips = [
      mockTrip({startDate: moment(new Date('01/01/2020')).toDate()}),
      mockTrip({startDate: moment(new Date('06/06/2020')).toDate()}),
      mockTrip({startDate: moment(new Date('12/12/2020')).toDate()}),
    ];
    const newTrip = mockTrip({
      startDate: moment(new Date('08/08/2020')).toDate(),
    });
    const expected = [
      mockTrip({startDate: moment(new Date('12/12/2020')).toDate()}),
      mockTrip({
        startDate: moment(new Date('08/08/2020')).toDate(),
      }),
      mockTrip({startDate: moment(new Date('06/06/2020')).toDate()}),
      mockTrip({startDate: moment(new Date('01/01/2020')).toDate()}),
    ];

    expect(insertOrdered(newTrip, arrayOfTrips, {desc: true})).toStrictEqual(
      expected,
    );
  });
});

describe.skip('sortByStartDateAsc()', () => {});

describe.skip('sortByStartDateDesc()', () => {});
