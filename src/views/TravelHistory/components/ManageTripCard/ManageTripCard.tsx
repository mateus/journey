import React, {useState, useCallback} from 'react';
import {
  Card,
  ComplexAction,
  Checkbox,
  DisplayText,
  DatePicker,
  FormLayout,
  Stack,
  TextField,
  TextStyle,
} from '@shopify/polaris';
import moment from 'moment';

import {DEFAULT_TRIP_LENGTH} from 'utilities/trip';
import {getCountryByCode} from 'utilities/countries';
import {Country, Trip} from 'types';
import {CountryTextField, Flag} from 'components';

import './ManageTripCard.scss';

export interface ManageTripCardProps {
  // List of trips. If undefined loads Submit new trio card style
  trip?: Trip;
  onClose(): void;
}

export function ManageTripCard({trip, onClose}: ManageTripCardProps) {
  const today = moment();
  const [locationValue, setLocation] = useState(trip?.location || '');
  const [notesValue, setNotes] = useState(trip?.notes || '');
  const [hasNotes, setHasNotes] = useState(Boolean(trip?.notes) || false);
  const [countryValue, setCountry] = useState<Country | undefined>(
    trip ? getCountryByCode(trip.countryCode) : undefined,
  );
  const [isCompletedValue, setIsCompleted] = useState(trip?.completed || false);
  const [sameDayValue, setSameDay] = useState(false);
  const [{month, year}, setDate] = useState({
    month: moment(trip?.startDate).month() || today.month(),
    year: moment(trip?.startDate).year() || today.year(),
  });
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

  const cardTitle = trip ? 'What is different?' : 'When is your next trip?';
  const primaryFooterActionContent = trip ? 'Update trip' : 'Submit new trip';
  const actions = [
    {
      content: 'Add notes',
      disabled: hasNotes,
      onAction: () => setHasNotes(true),
    },
  ];
  const secondaryFooterActions: ComplexAction[] | undefined = trip
    ? [{content: 'Cancel', onAction: onClose}, {content: 'Remove trip'}]
    : [{content: 'Cancel', onAction: onClose}];

  const handleSubmit = () => {
    console.log({
      completed: isCompletedValue,
      countryCode: countryValue?.countryCode,
      endDate: selectedDates.end,
      startDate: selectedDates.start,
      location: locationValue,
      notes: notesValue,
    });
  };

  return (
    <Card
      title={cardTitle}
      primaryFooterAction={{
        content: primaryFooterActionContent,
        onAction: handleSubmit,
      }}
      secondaryFooterActions={secondaryFooterActions}
      actions={actions}
      sectioned
    >
      <FormLayout>
        <TextField
          label="City"
          value={locationValue}
          placeholder="Ottawa, ON"
          onChange={(newLocation) => setLocation(newLocation)}
        />
        <CountryTextField
          country={countryValue}
          onChange={(selected) => setCountry(selected)}
        />
        {hasNotes && (
          <TextField
            multiline={2}
            label="Notes"
            value={notesValue}
            placeholder="Anything important to add?"
            onChange={(newNotes) => setNotes(newNotes)}
          />
        )}
        <FormLayout.Group>
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={(newMonth, newYear) =>
              setDate({month: newMonth, year: newYear})
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
            checked={isCompletedValue}
            onChange={() => setIsCompleted(!isCompletedValue)}
          />
        </FormLayout.Group>
      </FormLayout>
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
                  {locationValue || '...'}
                </TextStyle>
              </TextStyle>
            </DisplayText>
            <p>{tripDatesHumanized()}</p>
            {notesValue && (
              <p>
                <TextStyle variation="subdued">{notesValue}</TextStyle>
              </p>
            )}
          </Stack>
          {countryValue && <Flag countryCode={countryValue.countryCode} />}
        </Stack>
      </div>
    );
  }
}
