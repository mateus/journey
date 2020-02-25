import moment from 'moment';

import {mockTrip} from 'utilities/trip';

import {
  insertOrdered,
  sortByStartDateAsc,
  sortByStartDateDesc,
} from '../utilities';

describe('insertOrdered()', () => {
  it('inserts Trip into an array of Trips and orders it', () => {
    const [trip1, trip2, trip3] = [
      mockTrip({startDate: new Date('01/01/2020')}),
      mockTrip({startDate: new Date('06/06/2020')}),
      mockTrip({startDate: new Date('12/12/2020')}),
    ];
    const newTrip = mockTrip({
      startDate: new Date('08/08/2020'),
    });
    const expected = [trip1, trip2, newTrip, trip3];

    expect(insertOrdered(newTrip, [trip1, trip2, trip3])).toStrictEqual(
      expected,
    );
  });

  it('inserts Trip into an array of Trips and orders it descendingly', () => {
    const [trip1, trip2, trip3] = [
      mockTrip({startDate: new Date('01/01/2020')}),
      mockTrip({startDate: new Date('06/06/2020')}),
      mockTrip({startDate: new Date('12/12/2020')}),
    ];
    const newTrip = mockTrip({
      startDate: new Date('08/08/2020'),
    });
    const expected = [trip3, newTrip, trip2, trip1];

    expect(
      insertOrdered(newTrip, [trip1, trip2, trip3], {desc: true}),
    ).toStrictEqual(expected);
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
