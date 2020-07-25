import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import moment from 'moment';
import {Badge, Caption, ResourceItem, DisplayText} from '@shopify/polaris';

import {mountWithAppProvider} from 'tests/utilities';
import {mockTrip} from 'utilities/trip';
import {Trip} from 'types';

import {TripDetails, TripDetailsProps} from '../TripDetails';

describe('<TripDetails />', () => {
  function createMockProps(trip?: Partial<Trip>): TripDetailsProps {
    return {
      trip: mockTrip(trip),
      completed: true,
      onEdit: jest.fn(),
    };
  }

  it('renders with the location', async () => {
    const location = 'Tatooine';
    const wrapper = await mountWithAppProvider(
      <TripDetails {...createMockProps({location})} />,
    );
    expect(wrapper.find(ResourceItem).find(DisplayText)).toHaveText(location);
  });

  it('renders Upcoming Badge if trip is not completed', async () => {
    const wrapper = await mountWithAppProvider(
      <TripDetails {...createMockProps()} completed={false} />,
    );
    expect(wrapper.find(Badge).text()).toContain('Upcoming');
  });

  it('renders a paragraph for the notes', async () => {
    const notes = 'Awesome notes';
    const wrapper = await mountWithAppProvider(
      <TripDetails {...createMockProps({notes})} />,
    );
    expect(
      wrapper.find('p').filterWhere((node) => node.text() === notes),
    ).toExist();
  });

  it('renders <ReactCountryFlag />', async () => {
    const countryCode = 'CA';
    const wrapper = await mountWithAppProvider(
      <TripDetails {...createMockProps({countryCode})} />,
    );
    expect(wrapper.find(ReactCountryFlag)).toHaveProp({
      countryCode,
      svg: true,
    });
  });

  it('renders <Caption /> with start and end dates', async () => {
    const trip = mockTrip();
    const wrapper = await mountWithAppProvider(
      <TripDetails {...createMockProps()} />,
    );
    expect(wrapper.find(Caption)).toHaveText(
      `${moment(trip.startDate).format('LL')} - ${moment(trip.endDate).format(
        'LL',
      )}`,
    );
  });

  it('renders <Caption /> a single date if both start and end dates are the same', async () => {
    const trip = mockTrip({
      startDate: new Date('01/01/2020'),
      endDate: new Date('01/01/2020'),
    });
    const wrapper = await mountWithAppProvider(
      <TripDetails {...createMockProps(trip)} />,
    );
    expect(wrapper.find(Caption)).toHaveText(
      moment(trip.startDate).format('LL'),
    );
  });

  it('calls the onEdit prop when clicking the ResourceItem', async () => {
    const spyOnEdit = jest.fn();
    const wrapper = await mountWithAppProvider(
      <TripDetails {...createMockProps()} onEdit={spyOnEdit} />,
    );
    wrapper.find(ResourceItem).prop('onClick')!();
    expect(spyOnEdit).toHaveBeenCalled();
  });
});
