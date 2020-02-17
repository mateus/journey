import React, {useState, useCallback} from 'react';
import {
  Card,
  Checkbox,
  DisplayText,
  DatePicker,
  FormLayout,
  Stack,
  TextField,
  TextStyle,
  TextContainer,
} from '@shopify/polaris';
import moment from 'moment';

import {CountryTextField} from 'components';
import {Trip} from 'types';

interface ManageTripCardProps {
  trip?: Trip;
  onClose(): void;
}

const DEFAULT_TRIP_LENGTH = 3;

export function ManageTripCard({trip, onClose}: ManageTripCardProps) {
  const today = moment();
  const [locationValue, setLocation] = useState(trip?.location || '');
  const [notesValue, setNotes] = useState(trip?.notes || '');
  const [hasNotes, setHasNotes] = useState(Boolean(trip?.notes) || false);
  const [countryValue, setCountry] = useState(trip?.countryCode || '');
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

  const cardTitle = trip ? 'Edit this trip' : 'What is your next trip?';
  const primaryFooterActionContent = trip ? 'Update trip' : 'Submit new trip';

  return (
    <Card
      title={cardTitle}
      primaryFooterAction={{content: primaryFooterActionContent}}
      actions={[
        {
          content: 'Add notes',
          onAction: () => setHasNotes(true),
          disabled: hasNotes,
        },
        {content: 'Close', onAction: onClose},
      ]}
    >
      <Card.Section>
        <FormLayout>
          <TextField
            label="City"
            value={locationValue}
            placeholder="Anywhere"
            onChange={(newLocation) => setLocation(newLocation)}
          />
          <CountryTextField
            value={countryValue}
            onChange={(selected) => setCountry(selected)}
          />
          {hasNotes && (
            <TextField
              multiline={2}
              label="Notes"
              value={notesValue}
              placeholder="Anything extra"
              onChange={(newNotes) => setNotes(newNotes)}
            />
          )}
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
          <Checkbox
            label="Same day trip"
            checked={sameDayValue}
            onChange={handleSameDayChange}
          />
        </FormLayout>
      </Card.Section>

      <Card.Section>
        <Stack vertical>
          <TextContainer spacing="tight">
            <DisplayText size="small" element="h3">
              Trip to {locationValue || '...'}
            </DisplayText>
            <p>
              Traveling from{' '}
              <TextStyle variation="strong">
                {moment(selectedDates.start).format('LL')}
              </TextStyle>{' '}
              until{' '}
              <TextStyle variation="strong">
                {moment(selectedDates.end).format('LL')}
              </TextStyle>
            </p>
            {notesValue && (
              <p>
                <TextStyle variation="subdued">{notesValue}</TextStyle>
              </p>
            )}
          </TextContainer>
        </Stack>
      </Card.Section>
    </Card>
  );
}
