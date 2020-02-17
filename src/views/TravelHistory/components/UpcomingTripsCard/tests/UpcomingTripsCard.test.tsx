import React from 'react';
import {mountWithPolarisProvider} from 'utilities/tests';
import {Card, Caption, Heading, List, TextStyle, Stack} from '@shopify/polaris';

import {UpcomingTripsCard, UpcomingTripsCardProps} from '../UpcomingTripsCard';

describe('<UpcomingTripsCard />', () => {
  const list: UpcomingTripsCardProps['list'] = [
    {
      location: 'Some awesome location',
      startDate: 'Mar 16, 2020',
      endDate: 'Mar 28, 2020',
    },
    {
      location: 'Another location',
      startDate: 'Sept 01, 2020',
      endDate: 'Sept 17, 2020',
    },
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
      ).toEqual(`${startDate} until ${endDate}`);
    });
  });
});
