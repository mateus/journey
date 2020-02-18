import React from 'react';
import {Badge, Caption, Card, DisplayText} from '@shopify/polaris';
import ReactCountryFlag from 'react-country-flag';
import {act} from 'react-dom/test-utils';
import moment from 'moment';

import {mountWithPolarisProvider} from 'utilities/tests';
import {mockTrip} from 'utilities/trip';

import {TripDetailsCard} from '../TripDetailsCard';
import {ManageTripCard} from '../../ManageTripCard';

describe('<TripDetailsCard />', () => {
  it('renders with the location', () => {
    const location = 'Tatooine';
    const wrapper = mountWithPolarisProvider(
      <TripDetailsCard {...mockTrip({location})} />,
    );
    const title = mountWithPolarisProvider(
      wrapper.find(Card).prop('title') as React.ReactElement,
    );
    expect(title.find(DisplayText).text()).toEqual(location);
  });

  it('renders a subdued Card if trip is completed', () => {
    const wrapper = mountWithPolarisProvider(
      <TripDetailsCard {...mockTrip({completed: true})} />,
    );
    expect(wrapper.find(Card).prop('subdued')).toBeTruthy();
  });

  it('renders Completed Badge if trip is completed', () => {
    const wrapper = mountWithPolarisProvider(
      <TripDetailsCard {...mockTrip({completed: true})} />,
    );
    expect(wrapper.find(Badge).text()).toEqual('Completed');
  });

  it('renders Upcoming Badge if trip is not completed', () => {
    const wrapper = mountWithPolarisProvider(
      <TripDetailsCard {...mockTrip({completed: false})} />,
    );
    expect(wrapper.find(Badge).text()).toContain('Upcoming');
  });

  it('renders a paragraph for the notes', () => {
    const notes = 'Awesome notes';
    const wrapper = mountWithPolarisProvider(
      <TripDetailsCard {...mockTrip({notes})} />,
    );
    expect(
      wrapper.find('p').findWhere((node) => node.text() === notes),
    ).toBeTruthy();
  });

  it('renders <ReactCountryFlag />', () => {
    const countryCode = 'CA';
    const wrapper = mountWithPolarisProvider(
      <TripDetailsCard {...mockTrip({countryCode})} />,
    );
    expect(wrapper.find(ReactCountryFlag).props()).toMatchObject({
      countryCode,
      svg: true,
    });
  });

  it('renders <ManageTripCard /> when Edit action is triggered', async () => {
    const trip = mockTrip();
    const wrapper = mountWithPolarisProvider(<TripDetailsCard {...trip} />);
    await act(async () => {
      await wrapper.find(Card)!.prop('actions')![0].onAction!();
      wrapper.update();
    });
    expect(wrapper.find(ManageTripCard).prop('trip')).toStrictEqual(trip);
  });

  it('renders <Caption /> with start and end dates', async () => {
    const trip = mockTrip();
    const wrapper = mountWithPolarisProvider(<TripDetailsCard {...trip} />);
    expect(wrapper.find(Caption).text()).toEqual(
      `${moment(trip.startDate).format('LL')} - ${moment(trip.endDate).format(
        'LL',
      )}`,
    );
  });
});
