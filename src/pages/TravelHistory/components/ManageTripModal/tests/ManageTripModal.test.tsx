import React from 'react';
import {act} from 'react-dom/test-utils';
import {ReactWrapper} from 'enzyme';
import {
  Banner,
  Button,
  Checkbox,
  TextField,
  List,
  Modal,
  DatePicker,
  DatePickerProps,
  Range,
} from '@shopify/polaris';
import moment from 'moment';

import {mountWithAppProvider, updateWrapper} from 'tests/utilities';
import {getCountryByCode} from 'utilities/countries';
import {mockTrip} from 'utilities/trip';
import {noop, noopPromise} from 'utilities/other';
import {CountryTextField} from 'components';
import {Country} from 'types';

import {ManageTripModal, ManageTripModalProps} from '../ManageTripModal';

describe('<ManageTripModal />', () => {
  const mockProps: ManageTripModalProps = {
    open: true,
    trip: mockTrip(),
    onClose: noop,
    onAddNew: noopPromise,
    onUpdate: noopPromise,
    onDelete: noop,
  };

  it('renders closed if prop is set to false', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} open={false} />,
    );

    expect(wrapper.find(Modal).prop('open')).toBeFalsy();
  });

  it('renders a modal with title with location', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} />,
    );

    expect(wrapper.find(Modal).prop('title')).toBe(
      `Trip to ${mockProps.trip!.location}`,
    );
  });

  it('renders a modal with primary action content to Save changes', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} />,
    );

    expect(wrapper.find(Modal).prop('primaryAction')?.content).toBe(
      'Save changes',
    );
  });

  it('triggers onClose when closing the modal', async () => {
    const onCloseSpy = jest.fn();
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} onClose={onCloseSpy} />,
    );
    wrapper.find(Modal).prop('onClose')!();

    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('triggers onClose when clicking the Cancel action', async () => {
    const onCloseSpy = jest.fn();
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} onClose={onCloseSpy} />,
    );
    wrapper.find(Modal).prop('secondaryActions')![0].onAction!();

    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('renders Remove trip button', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} />,
    );
    const modalFooter = await mountWithAppProvider(
      wrapper.find(Modal).prop('footer') as React.ReactElement,
    );
    const removeTripButton = modalFooter.find(Button);

    expect(removeTripButton.text()).toBe('Remove trip');
    expect(removeTripButton.props()).toMatchObject({
      destructive: true,
    });
  });

  it('triggers onDelete when clicking Remove trip button', async () => {
    const onDeleteSpy = jest.fn();
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} onDelete={onDeleteSpy} />,
    );
    const modalFooter = await mountWithAppProvider(
      wrapper.find(Modal).prop('footer') as React.ReactElement,
    );
    modalFooter.find(Button).prop('onClick')!();

    expect(onDeleteSpy).toHaveBeenCalled();
  });

  it('renders primary action disabled', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} />,
    );

    expect(wrapper.find(Modal).prop('primaryAction')).toMatchObject({
      disabled: true,
    });
  });

  it('renders City text field', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} />,
    );

    expect(
      wrapper
        .find(TextField)
        .filterWhere((node) => node.prop('label') === 'City')
        .props(),
    ).toMatchObject({
      value: mockProps.trip!.location,
      placeholder: 'Ottawa, ON',
      autoComplete: false,
    });
  });

  it('renders CountryTextField', async () => {
    const trip = mockTrip({countryCode: 'CA'});
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} trip={trip} />,
    );

    expect(wrapper.find(CountryTextField).prop('country')).toEqual(
      getCountryByCode(trip.countryCode),
    );
  });

  it('renders Notes text field', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} />,
    );

    expect(
      wrapper
        .find(TextField)
        .filterWhere((node) => node.prop('label') === 'Notes')
        .props(),
    ).toMatchObject({
      value: mockProps.trip!.notes,
      multiline: 2,
      placeholder: 'Anything important to add?',
    });
  });

  it('renders Checkbox unchecked if start and end dates are the different', async () => {
    const today = moment();
    const selectedDates = {
      startDate: today.toDate(),
      endDate: today.add(5, 'days').toDate(),
    };
    const trip = mockTrip(selectedDates);
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} trip={trip} />,
    );

    expect(wrapper.find(Checkbox).props()).toMatchObject({
      label: 'Same day trip',
      checked: false,
    });
  });

  it('renders Checkbox checked if start and end dates are the same', async () => {
    const today = moment().toDate();
    const selectedDates = {
      startDate: today,
      endDate: today,
    };
    const trip = mockTrip(selectedDates);
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} trip={trip} />,
    );

    expect(wrapper.find(Checkbox).props()).toMatchObject({
      label: 'Same day trip',
      checked: true,
    });
  });

  describe('<DatePicker />', () => {
    it('renders DatePicker', async () => {
      const wrapper = await mountWithAppProvider(
        <ManageTripModal {...mockProps} />,
      );

      expect(wrapper.find(DatePicker)).toExist();
    });

    it('renders DatePicker with start and end dates', async () => {
      const today = moment();
      const selectedDates = {
        startDate: today.toDate(),
        endDate: today.add(5, 'days').toDate(),
      };
      const {startDate: start, endDate: end} = selectedDates;
      const trip = mockTrip(selectedDates);
      const wrapper = await mountWithAppProvider(
        <ManageTripModal {...mockProps} trip={trip} />,
      );

      expect(wrapper.find(DatePicker).props()).toMatchObject({
        allowRange: true,
        selected: {start, end},
      });
    });

    it('renders DatePicker with start and end dates the same day', async () => {
      const today = moment().toDate();
      const selectedDates = {
        startDate: today,
        endDate: today,
      };
      const {startDate: start, endDate: end} = selectedDates;
      const trip = mockTrip(selectedDates);
      const wrapper = await mountWithAppProvider(
        <ManageTripModal {...mockProps} trip={trip} />,
      );

      expect(wrapper.find(DatePicker).props()).toMatchObject({
        allowRange: false,
        selected: {start, end},
      });
    });
  });

  it('renders Error Banner when if the form is invalid', async () => {
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} />,
    );
    await updateTextField(wrapper, 'City', '');
    await submitForm(wrapper);
    const errorBanner = wrapper.find(Banner);

    expect(errorBanner.prop('status')).toBe('critical');
    expect(errorBanner.find('p').text()).toBe(
      'There were some issues with your form submission:',
    );
    expect(errorBanner.find(List.Item).map((node) => node.text())).toEqual([
      'Location is required',
    ]);
  });

  it('triggers onUpdate with updated trip details', async () => {
    const onUpdateSpy = jest.fn();
    const wrapper = await mountWithAppProvider(
      <ManageTripModal {...mockProps} onUpdate={onUpdateSpy} />,
    );
    const expectedCity = 'New city';
    const expectedNotes = 'New notes';
    const expectedCountryCode = getCountryByCode('CA')!;
    const expectedDateRage: Range = {
      start: new Date('04/04/2020'),
      end: new Date('14/04/2020'),
    };

    await updateTextField(wrapper, 'City', expectedCity);
    await updateTextField(wrapper, 'Notes', expectedNotes);
    await updateCountryField(wrapper, expectedCountryCode);
    await updateDatePickerSelection(wrapper, expectedDateRage);
    await submitForm(wrapper);

    expect(onUpdateSpy).toBeCalledWith({
      ...mockProps.trip!,
      startDate: expectedDateRage.start,
      endDate: expectedDateRage.end,
      location: expectedCity,
      notes: expectedNotes,
      countryCode: expectedCountryCode.countryCode,
    });
  });

  describe('Trip summary section', () => {});

  describe('Without a trip object (Creating new trip)', () => {
    const mockPropsWihtoutTrip: ManageTripModalProps = {
      ...mockProps,
      trip: undefined,
    };

    it('renders a modal with title', async () => {
      const wrapper = await mountWithAppProvider(
        <ManageTripModal {...mockPropsWihtoutTrip} />,
      );

      expect(wrapper.find(Modal).prop('title')).toBe('When is your next trip?');
    });

    it('renders a modal with primary action content to Save changes', async () => {
      const wrapper = await mountWithAppProvider(
        <ManageTripModal {...mockPropsWihtoutTrip} />,
      );

      expect(wrapper.find(Modal).prop('primaryAction')?.content).toBe(
        'Submit new trip',
      );
    });

    it('does not render Remove trip button', async () => {
      const wrapper = await mountWithAppProvider(
        <ManageTripModal {...mockPropsWihtoutTrip} />,
      );
      const modalFooter = await mountWithAppProvider(
        wrapper.find(Modal).prop('footer') as React.ReactElement,
      );

      expect(modalFooter.find(Button)).not.toExist();
    });

    // https://github.com/mateus/journey/issues/98
    it.skip('triggers onAddNew with new trip details', async () => {
      const onAddNewSpy = jest.fn();
      const wrapper = await mountWithAppProvider(
        <ManageTripModal {...mockPropsWihtoutTrip} onAddNew={onAddNewSpy} />,
      );
      const expectedCity = 'New city';
      const expectedNotes = 'New notes';
      const expectedCountryCode = getCountryByCode('CA')!;
      const expectedDateRage: Range = {
        start: new Date('04/04/2020'),
        end: new Date('14/04/2020'),
      };

      await updateTextField(wrapper, 'City', expectedCity);
      await updateTextField(wrapper, 'Notes', expectedNotes);
      await updateCountryField(wrapper, expectedCountryCode);
      await updateDatePickerSelection(wrapper, expectedDateRage);
      await submitForm(wrapper);

      expect(onAddNewSpy).toBeCalledWith({
        startDate: expectedDateRage.start,
        endDate: expectedDateRage.end,
        location: expectedCity,
        notes: expectedNotes,
        countryCode: expectedCountryCode.countryCode,
      });
    });
  });

  async function updateTextField(
    wrapper: ReactWrapper,
    label: string,
    value: any,
  ) {
    act(() => {
      const onChangeHandler = wrapper
        .find(TextField)
        .filterWhere((node) => node.prop('label') === label)
        .prop('onChange');
      if (onChangeHandler) onChangeHandler(value, '');
    });
    await updateWrapper(wrapper);
  }

  async function updateCountryField(
    wrapper: ReactWrapper,
    countryCode: Country,
  ) {
    act(() => {
      const onChangeHandler = wrapper.find(CountryTextField).prop('onChange');
      onChangeHandler(countryCode);
    });
    await updateWrapper(wrapper);
  }

  async function updateDatePickerSelection(
    wrapper: ReactWrapper,
    selected: Range,
  ) {
    act(() => {
      const onChangeHandler = wrapper.find(DatePicker).prop('onChange');
      if (onChangeHandler) onChangeHandler(selected);
    });
    await updateWrapper(wrapper);
  }

  async function submitForm(wrapper: ReactWrapper) {
    act(() => {
      wrapper.find(Modal).prop('primaryAction')!.onAction!();
    });
    await updateWrapper(wrapper);
  }
});
