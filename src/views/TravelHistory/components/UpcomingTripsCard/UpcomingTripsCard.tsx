import React from 'react';
import {Card, Caption, Heading, List, TextStyle, Stack} from '@shopify/polaris';
import {Trip} from 'types';

export interface UpcomingTripsCardProps {
  list: Trip[];
}

export function UpcomingTripsCard({list}: UpcomingTripsCardProps) {
  return (
    <Card title="Upcoming" sectioned subdued>
      <List type="bullet">
        {list.map(({location, startDate, endDate}) => (
          <List.Item key={location}>
            <Stack vertical spacing="extraTight">
              <Heading>Trip to {location}</Heading>
              <TextStyle variation="subdued">
                <Caption>
                  <TextStyle variation="strong">{startDate}</TextStyle> until{' '}
                  <TextStyle variation="strong">{endDate}</TextStyle>
                </Caption>
              </TextStyle>
            </Stack>
          </List.Item>
        ))}
      </List>
    </Card>
  );
}
