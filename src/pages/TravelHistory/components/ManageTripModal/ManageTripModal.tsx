import React, {useState, memo} from 'react';
import moment from 'moment';
import {
  Banner,
  Button,
  Checkbox,
  DisplayText,
  DatePicker,
  Form,
  FormLayout,
  List,
  Modal,
  Stack,
  TextField,
  TextStyle,
} from '@shopify/polaris';
import {useForm, useField, notEmpty} from '@shopify/react-form';

import {DEFAULT_TRIP_LENGTH} from 'utilities/trip';
import {getCountryByCode} from 'utilities/countries';
import {Country, Trip} from 'types';
import {CountryTextField, Flag} from 'components';

import './ManageTripModal.scss';

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
  // console.log('<ManageTripModal /> rendered');

  const today = moment();
  const [sameDayValue, setSameDay] = useState(
    trip ? trip?.startDate === trip?.endDate : false,
  );
  const {fields, submit, submitting, dirty, submitErrors} = useForm({
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
      datePicker: useField({
        month: moment(trip?.startDate).month() || today.month(),
        year: moment(trip?.startDate).year() || today.year(),
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
          // onUpdate might rerender the page. Can cause no-ops with onClose
          await onUpdate(payload).then(onClose);
        } else {
          await onAddNew(payload);
        }

        return {status: 'success'};
      } catch (error) {
        return {status: 'fail', errors: [{message: error.message}]};
      }
    },
  });

  const cardTitle = trip ? 'What is different?' : 'When is your next trip?';
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
              {...fields.location}
              label="City"
              placeholder="Ottawa, ON"
              autoComplete={false}
            />
            <CountryTextField
              error={fields.country.error}
              country={fields.country.value}
              onChange={fields.country.onChange}
            />
            <TextField
              {...fields.notes}
              multiline={2}
              label="Notes"
              placeholder="Anything important to add?"
            />
            <FormLayout.Group>
              <DatePicker
                month={fields.datePicker.value.month}
                year={fields.datePicker.value.year}
                onChange={fields.selectedDates.onChange}
                onMonthChange={(newMonth, newYear) =>
                  fields.datePicker.onChange({month: newMonth, year: newYear})
                }
                selected={fields.selectedDates.value}
                allowRange={!sameDayValue}
              />
              {renderSummary()}
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

  function renderTripDatesHumanized() {
    return sameDayValue ? (
      <TextStyle variation="strong">
        {moment(fields.selectedDates.value.start).format('ll')}
      </TextStyle>
    ) : (
      <>
        <TextStyle variation="strong">
          {moment(fields.selectedDates.value.start).format('ll')}
        </TextStyle>{' '}
        until{' '}
        <TextStyle variation="strong">
          {moment(fields.selectedDates.value.end).format('ll')}
        </TextStyle>
      </>
    );
  }

  function renderSummary() {
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
            <p>{renderTripDatesHumanized()}</p>
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
    fields.selectedDates.onChange({
      start: fields.selectedDates.value.start,
      end: fields.selectedDates.value.start,
    });
  }
});
