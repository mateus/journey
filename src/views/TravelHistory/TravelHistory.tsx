import React from 'react';
import {Page, Card, Layout, SkeletonBodyText, Stack} from '@shopify/polaris';

export function TravelHistory() {
  return (
    <Page title="Travel History">
      <Layout>
        <Layout.Section>
          <Card title="Add new trip" sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Past trips" sectioned>
            <Stack vertical spacing="loose">
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Notes" sectioned subdued>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
