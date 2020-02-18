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

  it('inserts Trip into an array of Trips and orders it descendingly', () => {
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

const pastTrip = mockTrip({
  startDate: moment(new Date())
    .subtract(1, 'days')
    .toDate(),
});
const futureTrip = mockTrip({
  startDate: moment(new Date())
    .add(1, 'days')
    .toDate(),
});

describe('sortByStartDateAsc()', () => {
  it('returns -1 if trip A is before trip B', () => {
    expect(sortByStartDateAsc(pastTrip, futureTrip)).toStrictEqual(-1);
  });

  it('returns 0 if trip A is after trip B', () => {
    const pastTrip = mockTrip({
      startDate: moment(new Date())
        .subtract(1, 'days')
        .toDate(),
    });
    const futureTrip = mockTrip({
      startDate: moment(new Date())
        .add(1, 'days')
        .toDate(),
    });

    expect(sortByStartDateAsc(futureTrip, pastTrip)).toStrictEqual(0);
  });
});

describe('sortByStartDateDesc()', () => {
  it('returns 0 if trip A is before trip B', () => {
    expect(sortByStartDateDesc(pastTrip, futureTrip)).toStrictEqual(0);
  });

  it('returns -1 if trip A is after trip B', () => {
    const pastTrip = mockTrip({
      startDate: moment(new Date())
        .subtract(1, 'days')
        .toDate(),
    });
    const futureTrip = mockTrip({
      startDate: moment(new Date())
        .add(1, 'days')
        .toDate(),
    });

    expect(sortByStartDateDesc(futureTrip, pastTrip)).toStrictEqual(-1);
  });
});
