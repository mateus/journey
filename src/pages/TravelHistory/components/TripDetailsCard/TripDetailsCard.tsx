import React, {memo, useState} from 'react';
import {Badge, Card, Caption, DisplayText, Stack} from '@shopify/polaris';
import moment from 'moment';

import {Flag} from 'components';
import {Trip} from 'types';

import {ManageTripCard} from '../ManageTripCard';

export interface TripDetailsCardProps extends Trip {
  completed: boolean;
  onAddNew(trip: Trip): Promise<unknown>;
  onUpdate(trip: Trip): Promise<unknown>;
  onDelete(trip: Trip): Promise<unknown>;
}

export function TripDetailsCard({
  onAddNew,
  onUpdate,
  onDelete,
  completed,
  ...trip
}: TripDetailsCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {location, notes, startDate, endDate, countryCode} = trip;

  const cardMarkup = isEditing ? (
    <ManageTripCard
      trip={trip}
      onClose={() => setIsEditing(false)}
      onAddNew={onAddNew}
      onUpdate={onUpdate}
      onDelete={onDelete}
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

  return cardMarkup;

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
}

export const MemoizedTripDetailsCard = memo(TripDetailsCard);
