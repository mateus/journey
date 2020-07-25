import React from 'react';
import moment from 'moment';
import {Caption} from '@shopify/polaris';

import {mockTrip} from 'utilities/trip';
import {mountWithAppProvider} from 'tests/utilities';
import {Flag} from 'components';

import {AnalyticsCard} from '../AnalyticsCard';

describe('<AnalyticsCard />', () => {
  it('renders completed trips total', async () => {
    const todayDate = moment()
      .startOf('day')
      .toDate();
    const pastDate = moment(todayDate)
      .subtract(1, 'days')
      .toDate();
    const futureDate = moment(todayDate)
      .add(1, 'days')
      .toDate();
    const pastTrip = mockTrip({
      startDate: pastDate,
      endDate: pastDate,
    });
    const todayTrip = mockTrip({
      startDate: todayDate,
      endDate: todayDate,
    });
    const futureTrip = mockTrip({
      startDate: futureDate,
      endDate: futureDate,
    });
    const trips = [pastTrip, todayTrip, futureTrip];
    const wrapper = await mountWithAppProvider(<AnalyticsCard trips={trips} />);
    expect(
      wrapper
        .find('p')
        .filterWhere((node) => node.text().includes(`${String(2)} trips`)),
    ).toExist();
  });

  it('renders places visited total', async () => {
    const todayDate = moment()
      .startOf('day')
      .toDate();
    const pastDate = moment(todayDate)
      .subtract(1, 'days')
      .toDate();
    const futureDate = moment(todayDate)
      .add(1, 'days')
      .toDate();
    const pastTrip = mockTrip({
      location: 'Ottawa',
      startDate: pastDate,
      endDate: pastDate,
    });
    const todayTrip = mockTrip({
      location: 'Ottawa',
      startDate: todayDate,
      endDate: todayDate,
    });
    const futureTrip = mockTrip({
      location: 'Montreal',
      startDate: futureDate,
      endDate: futureDate,
    });
    const trips = [pastTrip, todayTrip, futureTrip];
    const wrapper = await mountWithAppProvider(<AnalyticsCard trips={trips} />);
    expect(
      wrapper
        .find('p')
        .filterWhere((node) => node.text() === `${String(1)} places visited`),
    ).toExist();
  });

  it('renders total amount of days traveled', async () => {
    const totalTripDays = 5;
    const past = moment(new Date('01/01/2020')).startOf('day');
    const today = moment().startOf('day');
    const futureDate = moment(today)
      .add(10, 'days')
      .toDate();
    const pastTrip = mockTrip({
      startDate: past.toDate(),
      endDate: past.add(totalTripDays, 'days').toDate(),
    });
    const futureTrip = mockTrip({
      startDate: futureDate,
      endDate: futureDate,
    });
    const trips = [pastTrip, futureTrip];
    const wrapper = await mountWithAppProvider(<AnalyticsCard trips={trips} />);
    expect(
      wrapper
        .find('p')
        .filterWhere(
          (node) =>
            node.text() === `${String(totalTripDays + 1)} days traveled`,
        ),
    ).toExist();
  });

  it('renders country visited total with flags', async () => {
    const todayDate = moment()
      .startOf('day')
      .toDate();
    const pastDate = moment(todayDate)
      .subtract(1, 'days')
      .toDate();
    const futureDate = moment(todayDate)
      .add(1, 'days')
      .toDate();
    const firstTrip = mockTrip({
      countryCode: 'CA',
      startDate: pastDate,
      endDate: pastDate,
    });
    const secondTrip = mockTrip({
      countryCode: 'CA',
      startDate: pastDate,
      endDate: pastDate,
    });
    const thirdTrip = mockTrip({
      countryCode: 'US',
      startDate: todayDate,
      endDate: todayDate,
    });
    const futureTrip = mockTrip({
      countryCode: 'AU',
      startDate: futureDate,
      endDate: futureDate,
    });
    const trips = [firstTrip, secondTrip, thirdTrip, futureTrip];
    const wrapper = await mountWithAppProvider(<AnalyticsCard trips={trips} />);
    expect(
      wrapper
        .find('p')
        .filterWhere(
          (node) => node.text() === `${String(2)} countries visited`,
        ),
    ).toExist();
    expect(wrapper.find(Flag).map((node) => node.props().countryCode)).toEqual([
      'CA',
      'US',
    ]);
  });

  it('shows message about the earliest trip start date', async () => {
    const todayDate = moment(new Date('01/01/2020'))
      .startOf('day')
      .toDate();
    const futureDate = moment(todayDate)
      .add(1, 'days')
      .toDate();
    const todayTrip = mockTrip({
      location: 'Ottawa',
      startDate: todayDate,
      endDate: todayDate,
    });
    const futureTrip = mockTrip({
      location: 'Montreal',
      startDate: futureDate,
      endDate: futureDate,
    });
    const trips = [todayTrip, futureTrip];
    const wrapper = await mountWithAppProvider(<AnalyticsCard trips={trips} />);
    expect(wrapper.find(Caption)).toHaveText(
      'Tracking trips since Jan 1, 2020',
    );
  });
});
