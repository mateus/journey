import React from 'react';
import {Card, Caption, Heading, List, TextStyle, Stack} from '@shopify/polaris';
import moment from 'moment';

import {Trip} from 'types';

export interface UpcomingTripsCardProps {
  list: Trip[];
}

export function UpcomingTripsCard({list}: UpcomingTripsCardProps) {
  const content =
    list.length > 0 ? (
      <List type="bullet">
        {list.map(({location, startDate, endDate}) => (
          <List.Item key={startDate + location}>
            <Stack vertical spacing="extraTight">
              <Heading>Trip to {location}</Heading>
              <TextStyle variation="subdued">
                <Caption>
                  <TextStyle variation="strong">
                    {moment(startDate).format('ll')}
                  </TextStyle>{' '}
                  until{' '}
                  <TextStyle variation="strong">
                    {moment(endDate).format('ll')}
                  </TextStyle>
                </Caption>
              </TextStyle>
            </Stack>
          </List.Item>
        ))}
      </List>
    ) : (
      <p>
        <TextStyle variation="subdued">You have no upcoming trips.</TextStyle>
      </p>
    );

  return (
    <Card title="Upcoming" sectioned subdued>
      {content}
    </Card>
  );
}
