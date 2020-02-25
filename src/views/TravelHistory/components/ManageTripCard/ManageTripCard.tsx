import React, {useState, useCallback} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import moment from 'moment';
import {
  Card,
  ComplexAction,
  Checkbox,
  DisplayText,
  DatePicker,
  Form,
  FormLayout,
  Stack,
  TextField,
  TextStyle,
} from '@shopify/polaris';
import {useForm, useField} from '@shopify/react-form';

import {auth, firestore} from 'utilities/firebase';
import {DEFAULT_TRIP_LENGTH} from 'utilities/trip';
import {getCountryByCode} from 'utilities/countries';
import {Country, Trip} from 'types';
import {CountryTextField, Flag} from 'components';

import './ManageTripCard.scss';

export interface ManageTripCardProps {
  // List of trips. If undefined loads Submit new trio card style
  trip?: Trip;
  onClose(): void;
  onSubmit(): void;
}

export function ManageTripCard({trip, onClose, onSubmit}: ManageTripCardProps) {
  const today = moment();
  const [user] = useAuthState(auth);
  const [hasNotes, setHasNotes] = useState(Boolean(trip?.notes) || false);
  const [sameDayValue, setSameDay] = useState(false);

  const [selectedDates, setSelectedDates] = useState({
    start: trip?.startDate || today.toDate(),
    end: trip?.endDate || today.add(DEFAULT_TRIP_LENGTH, 'days').toDate(),
  });

  const handleSameDayChange = useCallback(
    (newSameDay) => {
      setSameDay(newSameDay);
      setSelectedDates({start: selectedDates.start, end: selectedDates.start});
    },
    [selectedDates.start],
  );

  const {fields, submit, submitting, dirty, submitErrors} = useForm({
    fields: {
      location: useField(trip?.location || ''),
      notes: useField(trip?.notes || ''),
      country: useField<Country | undefined>(
        trip ? getCountryByCode(trip.countryCode) : undefined,
      ),
      datePicker: useField({
        month: moment(trip?.startDate).month() || today.month(),
        year: moment(trip?.startDate).year() || today.year(),
      }),
      // selectedDates: useField({
      //   start: trip?.startDate || today.toDate(),
      //   end: trip?.endDate || today.add(DEFAULT_TRIP_LENGTH, 'days').toDate(),
      // }),
      completed: useField(trip?.completed || false),
    },
    async onSubmit({location, notes, country, completed}) {
      try {
        console.log({
          completed,
          countryCode: country?.countryCode,
          endDate: selectedDates.end,
          startDate: selectedDates.start,
          location,
          notes,
        });
        // firestore
        //   .collection('users')
        //   .doc(user?.uid)
        //   .collection('trips')
        //   .add({
        //     completed,
        //     countryCode: country?.countryCode,
        //     endDate: selectedDates.end,
        //     startDate: selectedDates.start,
        //     location,
        //     notes,
        //   });
        onSubmit();
        return {status: 'success'};
      } catch (error) {
        return {status: 'fail', errors: [{message: error.message}]};
      }
    },
  });

  const cardTitle = trip ? 'What is different?' : 'When is your next trip?';
  const primaryFooterActionContent = trip ? 'Update trip' : 'Submit new trip';
  const actions: ComplexAction[] = trip
    ? [
        {content: 'Remove trip', disabled: true},
        {
          content: 'Add notes',
          disabled: hasNotes,
          onAction: () => setHasNotes(true),
        },
      ]
    : [
        {
          content: 'Add notes',
          disabled: hasNotes,
          onAction: () => setHasNotes(true),
        },
      ];

  const secondaryFooterActions: ComplexAction[] = [
    {content: 'Cancel', onAction: onClose},
  ];

  return (
    <Card
      title={cardTitle}
      primaryFooterAction={{
        content: primaryFooterActionContent,
        onAction: submit,
        loading: submitting,
        disabled: !dirty,
      }}
      secondaryFooterActions={secondaryFooterActions}
      actions={actions}
      sectioned
    >
      <Form onSubmit={submit}>
        <FormLayout>
          <TextField
            {...fields.location}
            label="City"
            placeholder="Ottawa, ON"
          />
          <CountryTextField
            country={fields.country.value}
            onChange={fields.country.onChange}
          />
          {hasNotes && (
            <TextField
              {...fields.notes}
              multiline={2}
              label="Notes"
              placeholder="Anything important to add?"
            />
          )}
          <FormLayout.Group>
            <DatePicker
              month={fields.datePicker.value.month}
              year={fields.datePicker.value.year}
              onChange={setSelectedDates}
              onMonthChange={(newMonth, newYear) =>
                fields.datePicker.onChange({month: newMonth, year: newYear})
              }
              selected={selectedDates}
              allowRange={!sameDayValue}
            />
            {summaryMarkup()}
          </FormLayout.Group>
          <FormLayout.Group condensed>
            <Checkbox
              label="Same day trip"
              checked={sameDayValue}
              onChange={handleSameDayChange}
            />
            <Checkbox
              label="Completed trip"
              checked={fields.completed.value}
              onChange={fields.completed.onChange}
            />
          </FormLayout.Group>
        </FormLayout>
      </Form>
    </Card>
  );

  function tripDatesHumanized() {
    return sameDayValue ? (
      <TextStyle variation="strong">
        {moment(selectedDates.start).format('ll')}
      </TextStyle>
    ) : (
      <>
        <TextStyle variation="strong">
          {moment(selectedDates.start).format('ll')}
        </TextStyle>{' '}
        until{' '}
        <TextStyle variation="strong">
          {moment(selectedDates.end).format('ll')}
        </TextStyle>
      </>
    );
  }

  function summaryMarkup() {
    return (
      <div className="Summary">
        <Stack vertical alignment="center" spacing="loose">
          <Stack vertical alignment="center" spacing="tight">
            <DisplayText size="small" element="h3">
              <TextStyle variation="subdued">
                <TextStyle variation="strong">
                  {fields.location.value || '...'}
                </TextStyle>
              </TextStyle>
            </DisplayText>
            <p>{tripDatesHumanized()}</p>
            {fields.notes.value && (
              <p>
                <TextStyle variation="subdued">{fields.notes.value}</TextStyle>
              </p>
            )}
          </Stack>
          {fields.country?.value && (
            <Flag countryCode={fields.country?.value?.countryCode} />
          )}
        </Stack>
      </div>
    );
  }
}
