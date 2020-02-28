import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import {act} from 'react-dom/test-utils';
import {ReactWrapper} from 'enzyme';
import moment from 'moment';
import {Badge, Caption, Card, DisplayText} from '@shopify/polaris';

import {mountWithAppProvider, updateWrapper} from 'utilities/tests';
import {mockTrip} from 'utilities/trip';
import {Trip} from 'types';

import {TripDetailsCard, TripDetailsCardProps} from '../TripDetailsCard';
import {ManageTripCard} from '../../ManageTripCard';

describe('<TripDetailsCard />', () => {
  function createMockProps(trip?: Partial<Trip>): TripDetailsCardProps {
    return {
      ...mockTrip(trip),
      onAddNew: jest.fn(Promise.resolve),
      onUpdate: jest.fn(Promise.resolve),
      onDelete: jest.fn(Promise.resolve),
    };
  }

  it('renders with the location', async () => {
    const location = 'Tatooine';
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...createMockProps({location})} />,
    );
    const title = await mountWithAppProvider(
      wrapper.find(Card).prop('title') as React.ReactElement,
    );
    expect(title.find(DisplayText)).toHaveText(location);
  });

  it('renders a subdued Card if trip is completed', async () => {
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...createMockProps({completed: true})} />,
    );
    expect(wrapper.find(Card)).toHaveProp({subdued: true});
  });

  it('renders Completed Badge if trip is completed', async () => {
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...createMockProps({completed: true})} />,
    );
    expect(wrapper.find(Badge)).toHaveText('Completed');
  });

  it('renders Upcoming Badge if trip is not completed', async () => {
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...createMockProps({completed: false})} />,
    );
    expect(wrapper.find(Badge).text()).toContain('Upcoming');
  });

  it('renders a paragraph for the notes', async () => {
    const notes = 'Awesome notes';
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...createMockProps({notes})} />,
    );
    expect(
      wrapper.find('p').findWhere((node) => node.text() === notes),
    ).toBeTruthy();
  });

  it('renders <ReactCountryFlag />', async () => {
    const countryCode = 'CA';
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...createMockProps({countryCode})} />,
    );
    expect(wrapper.find(ReactCountryFlag)).toHaveProp({
      countryCode,
      svg: true,
    });
  });

  it('renders <Caption /> with start and end dates', async () => {
    const trip = mockTrip();
    const wrapper = await mountWithAppProvider(
      <TripDetailsCard {...createMockProps()} />,
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
      <TripDetailsCard {...createMockProps(trip)} />,
    );
    expect(wrapper.find(Caption)).toHaveText(
      moment(trip.startDate).format('LL'),
    );
  });

  describe('<ManageTripCard />', () => {
    async function clickEditTrip(wrapper: ReactWrapper) {
      act(() => {
        wrapper.find(Card).prop('actions')![0].onAction!();
      });
      await updateWrapper(wrapper);
    }

    it('renders when Edit action is triggered', async () => {
      const trip = mockTrip();
      const onAddNew = jest.fn(Promise.resolve);
      const onUpdate = jest.fn(Promise.resolve);
      const onDelete = jest.fn(Promise.resolve);
      const wrapper = await mountWithAppProvider(
        <TripDetailsCard
          {...trip}
          onAddNew={onAddNew}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />,
      );
      await clickEditTrip(wrapper);
      expect(wrapper.find(ManageTripCard)).toHaveProp({
        trip,
        onAddNew,
        onUpdate,
        onDelete,
      });
    });
  });
});
