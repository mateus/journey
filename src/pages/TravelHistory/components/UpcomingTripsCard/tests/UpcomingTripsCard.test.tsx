import React from 'react';
import {Card, Caption, Heading, List} from '@shopify/polaris';
import moment from 'moment';

import {mountWithAppProvider} from 'tests/utilities';
import {mockTrip} from 'utilities/trip';

import {UpcomingTripsCard, UpcomingTripsCardProps} from '../UpcomingTripsCard';

describe('<UpcomingTripsCard />', () => {
  const list: UpcomingTripsCardProps['list'] = [
    mockTrip({
      location: 'Some awesome location',
      startDate: new Date('May 4, 2020'),
      endDate: new Date('May 28, 2020'),
    }),
    mockTrip({
      location: 'Another location',
      startDate: new Date('Sept 01, 2020'),
      endDate: new Date('Sept 17, 2020'),
    }),
  ];

  it('renders a Card', async () => {
    const wrapper = await mountWithAppProvider(
      <UpcomingTripsCard list={list} />,
    );

    expect(wrapper.find(Card)).toHaveProp({title: 'Upcoming'});
  });

  it('renders a list of upcoming trips', async () => {
    const wrapper = await mountWithAppProvider(
      <UpcomingTripsCard list={list} />,
    );
    const upcomingList = wrapper.find(List.Item);

    list.forEach(({location, startDate, endDate}, index) => {
      expect(upcomingList.find(Heading).at(index)).toHaveText(
        `Trip to ${location}`,
      );
      expect(upcomingList.find(Caption).at(index)).toHaveText(
        `${moment(startDate).format('ll')} until ${moment(endDate).format(
          'll',
        )}`,
      );
    });
  });

  it('renders empty state message', async () => {
    const wrapper = await mountWithAppProvider(<UpcomingTripsCard list={[]} />);
    expect(wrapper.find('p')).toHaveText('You have no upcoming trips.');
  });
});
