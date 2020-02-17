import React, {useState, useCallback} from 'react';
import {
  Card,
  Checkbox,
  DisplayText,
  DatePicker,
  FormLayout,
  Stack,
  Link,
  TextField,
  TextStyle,
  TextContainer,
} from '@shopify/polaris';
import {CountryTextField} from 'components';
import {Trip} from 'types';
import moment from 'moment';

interface NewTripCardProps {
  trip?: Trip;
  onClose(): void;
}

const DEFAULT_TRIP_LENGTH = 3;

export function NewTripCard({trip, onClose}: NewTripCardProps) {
  const today = moment();
  const [locationValue, setLocation] = useState(trip?.location || '');
  const [notesValue, setNotes] = useState(trip?.notes || '');
  const [hasNotes, setHasNotes] = useState(false);
  const [countryValue, setCountry] = useState(trip?.country || '');
  const [sameDayValue, setSameDay] = useState(false);
  const [{month, year}, setDate] = useState({
    month: moment(trip?.startDate).month() || today.month(),
    year: moment(trip?.startDate).year() || today.year(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: trip?.startDate || today.toDate(),
    end: trip?.endDate || today.add(DEFAULT_TRIP_LENGTH, 'days').toDate(),
  });

  const handleMonthChange = useCallback(
    (newMonth, newYear) => setDate({month: newMonth, year: newYear}),
    [],
  );
  const handleLocationChange = useCallback(
    (newLocation) => setLocation(newLocation),
    [],
  );
  const handleSameDayChange = useCallback(
    (newSameDay) => {
      setSameDay(newSameDay);
      setSelectedDates({start: selectedDates.start, end: selectedDates.start});
    },
    [selectedDates.start],
  );
  const handleNotesChange = useCallback((newNotes) => setNotes(newNotes), []);

  return (
    <Card
      title="What is your next trip?"
      primaryFooterAction={{content: 'Submit new trip'}}
      actions={[{content: 'Close', onAction: onClose}]}
    >
      <Card.Section>
        <FormLayout>
          <TextField
            label="City"
            value={locationValue}
            placeholder="Anywhere"
            onChange={handleLocationChange}
          />
          <CountryTextField
            value={countryValue}
            onChange={(selected) => setCountry(selected)}
          />
          {!hasNotes && (
            <Link onClick={() => setHasNotes(true)}>Add notes</Link>
          )}
          {hasNotes && (
            <TextField
              multiline={2}
              label="Notes"
              value={notesValue}
              placeholder="Anything extra"
              onChange={handleNotesChange}
            />
          )}
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
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
