import React from 'react';
import {Badge, Caption, Card, DisplayText} from '@shopify/polaris';
import ReactCountryFlag from 'react-country-flag';
import {act} from 'react-dom/test-utils';
import moment from 'moment';

import {mountWithAppProvider, updateWrapper} from 'utilities/tests';
import {mockTrip} from 'utilities/trip';

import {TripDetailsCard} from '../TripDetailsCard';
import {ManageTripCard} from '../../ManageTripCard';

describe('<TripDetailsCard />', () => {
  it('renders with the location', async () => {
    const location = 'Tatooine';
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...mockTrip({location})} />,
    );
    const title = await mountWithAppProvider(
      wrapper.find(Card).prop('title') as React.ReactElement,
    );
    expect(title.find(DisplayText)).toHaveText(location);
  });

  it('renders a subdued Card if trip is completed', async () => {
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...mockTrip({completed: true})} />,
    );
    expect(wrapper.find(Card)).toHaveProp({subdued: true});
  });

  it('renders Completed Badge if trip is completed', async () => {
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...mockTrip({completed: true})} />,
    );
    expect(wrapper.find(Badge)).toHaveText('Completed');
  });

  it('renders Upcoming Badge if trip is not completed', async () => {
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...mockTrip({completed: false})} />,
    );
    expect(wrapper.find(Badge).text()).toContain('Upcoming');
  });

  it('renders a paragraph for the notes', async () => {
    const notes = 'Awesome notes';
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...mockTrip({notes})} />,
    );
    expect(
      wrapper.find('p').findWhere((node) => node.text() === notes),
    ).toBeTruthy();
  });

  it('renders <ReactCountryFlag />', async () => {
    const countryCode = 'CA';
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...mockTrip({countryCode})} />,
    );
    expect(wrapper.find(ReactCountryFlag)).toHaveProp({
      countryCode,
      svg: true,
    });
  });

  it('renders <ManageTripCard /> when Edit action is triggered', async () => {
    const trip = mockTrip();
    const wrapper = await mountWithAppProvider(<TripDetailsCard {...trip} />);
    act(() => {
      wrapper.find(Card).prop('actions')![0].onAction!();
    });
    await updateWrapper(wrapper);
    expect(wrapper.find(ManageTripCard)).toHaveProp({trip});
  });

  it('renders <Caption /> with start and end dates', async () => {
    const trip = mockTrip();
    const wrapper = await mountWithAppProvider(<TripDetailsCard {...trip} />);
    expect(wrapper.find(Caption)).toHaveText(
      `${moment(trip.startDate).format('LL')} - ${moment(trip.endDate).format(
        'LL',
      )}`,
    );
  });
});
