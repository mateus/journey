import moment from 'moment';

import {mockTrip} from 'utilities/trip';

import {
  insertOrdered,
  upcomingTrips,
  earliestTrip,
  sortByStartDateAsc,
  sortByStartDateDesc,
  sortByEndDateAsc,
  sortByEndDateDesc,
  listOfCountriesVisited,
  listOfPlacesVisited,
  filterUpcomingTrips,
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

describe('sortByStartDateAsc()', () => {
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

describe('sortByEndDateAsc()', () => {
  const pastTrip = mockTrip({
    endDate: moment(new Date())
      .subtract(1, 'days')
      .toDate(),
  });
  const futureTrip = mockTrip({
    endDate: moment(new Date())
      .add(1, 'days')
      .toDate(),
  });
  it('returns -1 if trip A is before trip B', () => {
    expect(sortByEndDateAsc(pastTrip, futureTrip)).toStrictEqual(-1);
  });

  it('returns 0 if trip A is after trip B', () => {
    const pastTrip = mockTrip({
      endDate: moment(new Date())
        .subtract(1, 'days')
        .toDate(),
    });
    const futureTrip = mockTrip({
      endDate: moment(new Date())
        .add(1, 'days')
        .toDate(),
    });

    expect(sortByEndDateAsc(futureTrip, pastTrip)).toStrictEqual(0);
  });
});

describe('sortByEndDateDesc()', () => {
  const pastTrip = mockTrip({
    endDate: moment(new Date())
      .subtract(1, 'days')
      .toDate(),
  });
  const futureTrip = mockTrip({
    endDate: moment(new Date())
      .add(1, 'days')
      .toDate(),
  });

  it('returns 0 if trip A is before trip B', () => {
    expect(sortByEndDateDesc(pastTrip, futureTrip)).toStrictEqual(0);
  });

  it('returns -1 if trip A is after trip B', () => {
    const pastTrip = mockTrip({
      endDate: moment(new Date())
        .subtract(1, 'days')
        .toDate(),
    });
    const futureTrip = mockTrip({
      endDate: moment(new Date())
        .add(1, 'days')
        .toDate(),
    });

    expect(sortByEndDateDesc(futureTrip, pastTrip)).toStrictEqual(-1);
  });
});

describe('upcomingTrips()', () => {
  it('returns sorted list of upcomingTrips based on the startDate', () => {
    const today = moment().startOf('day');
    const pastTrip = mockTrip({
      startDate: moment(today)
        .subtract(1, 'days')
        .toDate(),
    });
    const todayTrip = mockTrip({
      startDate: moment(today).toDate(),
    });
    const futureTrip = mockTrip({
      startDate: moment(today)
        .add(1, 'days')
        .toDate(),
    });
    const farFutureTrip = mockTrip({
      startDate: moment(today)
        .add(5, 'days')
        .toDate(),
    });
    const trips = [farFutureTrip, futureTrip, todayTrip, pastTrip];
    const expected = [futureTrip, farFutureTrip];
    expect(upcomingTrips(trips)).toStrictEqual(expected);
  });
});

describe('earliestTrip()', () => {
  it('returns earliest trip based on the startDate', () => {
    const today = moment().startOf('day');
    const pastTrip = mockTrip({
      startDate: moment(today)
        .subtract(1, 'days')
        .toDate(),
    });
    const todayTrip = mockTrip({
      startDate: moment(today).toDate(),
    });
    const futureTrip = mockTrip({
      startDate: moment(today)
        .add(1, 'days')
        .toDate(),
    });
    const trips = [futureTrip, todayTrip, pastTrip];
    expect(earliestTrip(trips)).toStrictEqual(pastTrip);
  });
});

describe('listOfCountriesVisited()', () => {
  it('returns list of countries already visited', () => {
    const today = moment().startOf('day');
    const pastTrip = mockTrip({
      countryCode: 'CA',
      startDate: moment(today)
        .subtract(1, 'days')
        .toDate(),
    });
    const todayTrip = mockTrip({
      countryCode: 'US',
      startDate: moment(today).toDate(),
    });
    const futureTrip = mockTrip({
      countryCode: 'BR',
      startDate: moment(today)
        .add(1, 'days')
        .toDate(),
    });
    const trips = [pastTrip, todayTrip, futureTrip];
    const expected = [pastTrip.countryCode, todayTrip.countryCode];
    expect(listOfCountriesVisited(trips)).toStrictEqual(expected);
  });

  it('returns list of countries without duplicates', () => {
    const today = moment().startOf('day');
    const pastTrip = mockTrip({
      countryCode: 'CA',
      startDate: moment(today)
        .subtract(1, 'days')
        .toDate(),
    });
    const todayTrip = mockTrip({
      countryCode: 'CA',
      startDate: moment(today).toDate(),
    });
    const trips = [pastTrip, todayTrip];
    const expected = ['CA'];
    expect(listOfCountriesVisited(trips)).toStrictEqual(expected);
  });
});

describe('listOfPlacesVisited()', () => {
  it('returns list of countries already visited', () => {
    const today = moment().startOf('day');
    const pastTrip = mockTrip({
      location: 'First place',
      startDate: moment(today)
        .subtract(1, 'days')
        .toDate(),
    });
    const todayTrip = mockTrip({
      location: 'Second place',
      startDate: moment(today).toDate(),
    });
    const futureTrip = mockTrip({
      location: 'Third place',
      startDate: moment(today)
        .add(1, 'days')
        .toDate(),
    });
    const trips = [pastTrip, todayTrip, futureTrip];
    const expected = [pastTrip.location, todayTrip.location];
    expect(listOfPlacesVisited(trips)).toStrictEqual(expected);
  });

  it('returns list of countries without duplicates', () => {
    const today = moment().startOf('day');
    const pastTrip = mockTrip({
      location: 'Ottawa',
      startDate: moment(today)
        .subtract(1, 'days')
        .toDate(),
    });
    const todayTrip = mockTrip({
      location: 'Ottawa',
      startDate: moment(today).toDate(),
    });
    const trips = [pastTrip, todayTrip];
    const expected = ['Ottawa'];
    expect(listOfPlacesVisited(trips)).toStrictEqual(expected);
  });
});

describe('filterUpcomingTrips()', () => {
  it('returns list of trips already started', () => {
    const today = moment().startOf('day');
    const pastTrip = mockTrip({
      startDate: moment(today)
        .subtract(1, 'days')
        .toDate(),
    });
    const todayTrip = mockTrip({
      startDate: moment(today).toDate(),
    });
    const futureTrip = mockTrip({
      startDate: moment(today)
        .add(1, 'days')
        .toDate(),
    });
    const trips = [pastTrip, todayTrip, futureTrip];
    const expected = [pastTrip, todayTrip];
    expect(filterUpcomingTrips(trips)).toStrictEqual(expected);
  });
});
