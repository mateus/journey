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

interface NewTripCardProps {
  location?: string;
  notes?: string;
  onClose(): void;
}

const DEFAULT_TRIP_LENGTH = 3;

export function NewTripCard({
  location = '',
  notes = '',
  onClose,
}: NewTripCardProps) {
  const today = moment();
  const [locationValue, setLocation] = useState(location);
  const [notesValue, setNotes] = useState(notes);
  const [sameDayValue, setSameDay] = useState(false);
  const [{month, year}, setDate] = useState({
    month: today.month(),
    year: today.year(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: today.toDate(),
    end: today.add(DEFAULT_TRIP_LENGTH, 'days').toDate(),
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
            label="Location"
            value={locationValue}
            placeholder="Anywhere"
            onChange={handleLocationChange}
          />
          <TextField
            multiline={2}
            label="Notes"
            value={notesValue}
            placeholder="Anything extra"
            onChange={handleNotesChange}
          />

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
