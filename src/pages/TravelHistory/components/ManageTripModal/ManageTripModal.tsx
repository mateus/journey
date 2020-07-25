import React, {useState, useEffect, memo} from 'react';
import moment from 'moment';
import {
  Banner,
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormLayout,
  List,
  Modal,
  Stack,
  TextField,
} from '@shopify/polaris';
import {
  useForm,
  useField,
  notEmpty,
  submitSuccess,
  submitFail,
} from '@shopify/react-form';

import {DEFAULT_TRIP_LENGTH} from 'utilities/trip';
import {getCountryByCode} from 'utilities/countries';
import {Country, Trip} from 'types';
import {CountryTextField} from 'components';

import {TripReviewSection} from './components';

export interface ManageTripModalProps {
  open: boolean;
  // List of trips. If undefined loads Submit new trio card style
  trip?: Trip;
  onClose(): void;
  onAddNew(trip: Trip): Promise<unknown>;
  onUpdate(trip: Trip): Promise<unknown>;
  onDelete(trip: Trip): void;
}

export const ManageTripModal = memo(function ManageTripModal({
  open,
  trip,
  onClose,
  onAddNew,
  onUpdate,
  onDelete,
}: ManageTripModalProps) {
  const today = moment().startOf('day');
  const [sameDayValue, setSameDay] = useState(
    trip ? Number(trip.startDate) === Number(trip.endDate) : false,
  );
  const [datePicker, setDatePicker] = useState({
    month: moment(trip?.startDate).month() || today.month(),
    year: moment(trip?.startDate).year() || today.year(),
  });

  useEffect(() => {
    if (trip) {
      setDatePicker({
        month: moment(trip.startDate).month(),
        year: moment(trip.startDate).year(),
      });
      setSameDay(Number(trip.startDate) === Number(trip.endDate));
    }
  }, [trip]);

  const {
    fields: {location, notes, country, selectedDates},
    submit,
    submitting,
    dirty,
    submitErrors,
  } = useForm({
    fields: {
      location: useField({
        value: trip?.location || '',
        validates: [notEmpty('Location is required')],
      }),
      notes: useField(trip?.notes || ''),
      country: useField<Country | undefined>({
        value: trip ? getCountryByCode(trip.countryCode) : undefined,
        validates: [notEmpty('Country is required')],
      }),
      selectedDates: useField({
        start: trip?.startDate || today.toDate(),
        end: trip?.endDate || today.add(DEFAULT_TRIP_LENGTH, 'days').toDate(),
      }),
    },
    async onSubmit({location, notes, country, selectedDates}) {
      try {
        const payload: Trip = {
          id: trip?.id || 'impossible-case',
          countryCode: country!.countryCode,
          endDate: selectedDates.end,
          startDate: selectedDates.start,
          location,
          notes,
        };
        if (trip) {
          await onUpdate(payload);
          onClose();
        } else {
          await onAddNew(payload);
        }

        return submitSuccess();
      } catch (error) {
        return submitFail();
      }
    },
  });

  const cardTitle = trip
    ? `Trip to ${trip.location}`
    : 'When is your next trip?';
  const primaryFooterActionContent = trip ? 'Save changes' : 'Submit new trip';

  const footerMarkup = trip ? (
    <Button destructive onClick={() => onDelete(trip)}>
      Remove trip
    </Button>
  ) : null;

  return (
    <Modal
      open={open}
      title={cardTitle}
      onClose={onClose}
      primaryAction={{
        content: primaryFooterActionContent,
        onAction: submit,
        loading: submitting,
        disabled: !dirty,
      }}
      secondaryActions={[{content: 'Cancel', onAction: onClose}]}
      footer={footerMarkup}
      sectioned
    >
      <Stack vertical>
        {renderErrorBanner()}
        <Form onSubmit={submit}>
          <FormLayout>
            <TextField
              {...location}
              label="City"
              placeholder="Ottawa, ON"
              autoComplete={false}
            />
            <CountryTextField
              error={country.error}
              country={country.value}
              onChange={country.onChange}
            />
            <TextField
              {...notes}
              multiline={2}
              label="Notes"
              placeholder="Anything important to add?"
            />
            <FormLayout.Group>
              <DatePicker
                month={datePicker.month}
                year={datePicker.year}
                onChange={selectedDates.onChange}
                onMonthChange={(newMonth, newYear) =>
                  setDatePicker({month: newMonth, year: newYear})
                }
                selected={selectedDates.value}
                allowRange={!sameDayValue}
              />
              <TripReviewSection
                countryCode={country.value?.countryCode}
                location={location.value}
                notes={notes.value}
                sameDayValue={sameDayValue}
                selectedDates={selectedDates.value}
              />
            </FormLayout.Group>
            <FormLayout.Group condensed>
              <Checkbox
                label="Same day trip"
                checked={sameDayValue}
                onChange={handleSameDayChange}
              />
            </FormLayout.Group>
          </FormLayout>
        </Form>
      </Stack>
    </Modal>
  );

  function renderErrorBanner() {
    return submitErrors.length > 0 ? (
      <Banner status="critical">
        <Stack vertical spacing="tight">
          <p>There were some issues with your form submission:</p>
          <List type="bullet">
            {submitErrors.map(({message}) => {
              return <List.Item key={message}>{message}</List.Item>;
            })}
          </List>
        </Stack>
      </Banner>
    ) : null;
  }

  function handleSameDayChange(newSameDay: boolean) {
    setSameDay(newSameDay);
    selectedDates.onChange({
      start: selectedDates.value.start,
      end: selectedDates.value.start,
    });
  }
});
