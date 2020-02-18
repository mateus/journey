import React from 'react';
import {Card, Caption, Heading, List} from '@shopify/polaris';
import moment from 'moment';

import {mountWithPolarisProvider} from 'utilities/tests';
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

  it('renders a Card', () => {
    const wrapper = mountWithPolarisProvider(<UpcomingTripsCard list={list} />);

    expect(wrapper.find(Card).prop('title')).toEqual('Upcoming');
  });

  it('renders a list of upcoming trips', () => {
    const wrapper = mountWithPolarisProvider(<UpcomingTripsCard list={list} />);
    const upcomingList = wrapper.find(List.Item);

    list.forEach(({location, startDate, endDate}, index) => {
      expect(
        upcomingList
          .find(Heading)
          .at(index)
          .text(),
      ).toEqual(`Trip to ${location}`);
      expect(
        upcomingList
          .find(Caption)
          .at(index)
          .text(),
      ).toEqual(
        `${moment(startDate).format('ll')} until ${moment(endDate).format(
          'll',
        )}`,
      );
    });
  });
});
