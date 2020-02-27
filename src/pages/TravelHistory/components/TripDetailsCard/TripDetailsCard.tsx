import React, {useState, memo} from 'react';
import {Badge, Card, Caption, DisplayText, Stack} from '@shopify/polaris';
import moment from 'moment';

import {useToast} from 'hooks/useToast';
import {Flag} from 'components';
import {Trip} from 'types';

import {ManageTripCard} from '..';

export function TripDetailsCard(trip: Trip) {
  const {location, notes, startDate, endDate, countryCode, completed} = trip;
  const [isEditing, setIsEditing] = useState(false);
  const [Toast, showToast] = useToast();

  const cardMarkup = isEditing ? (
    <ManageTripCard
      trip={trip}
      onClose={() => setIsEditing(false)}
      onSuccess={handleUpdateTrip}
      onRemoved={handleRemoveTrip}
    />
  ) : (
    <Card
      title={
        <Stack vertical spacing="extraTight">
          <Stack alignment="center" spacing="tight">
            <DisplayText size="small" element="h3">
              {location}
            </DisplayText>
            {renderBadge()}
          </Stack>
          {renderDatesCaption()}
        </Stack>
      }
      actions={[{content: 'Edit', onAction: () => setIsEditing(true)}]}
      subdued={completed}
      sectioned
    >
      <Stack wrap={false} spacing="extraLoose" alignment="trailing">
        <Stack.Item fill>{notes && <p>{notes}</p>}</Stack.Item>
        <Flag
          countryCode={countryCode}
          svg
          style={{
            width: 'auto',
            height: '26px',
            borderRadius: '3px',
          }}
        />
      </Stack>
    </Card>
  );

  return (
    <>
      {cardMarkup}
      <Toast />
    </>
  );

  function renderDatesCaption() {
    const start = moment(startDate).format('LL');
    const end = moment(endDate).format('LL');

    if (start === end) {
      return <Caption>{start}</Caption>;
    } else {
      return (
        <Caption>
          {start} - {end}
        </Caption>
      );
    }
  }

  function renderBadge() {
    return completed ? (
      <Badge>Completed</Badge>
    ) : (
      <Badge status="attention">Upcoming</Badge>
    );
  }

  function handleUpdateTrip() {
    setIsEditing(false);
    showToast({content: 'Trip updated'});
  }

  function handleRemoveTrip() {
    setIsEditing(false);
    showToast({content: 'Trip removed'});
  }
}

export const MemoizedTripDetailsCard = memo(TripDetailsCard);
