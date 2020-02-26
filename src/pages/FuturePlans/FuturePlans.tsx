import React from 'react';
import {EmptyState, Page} from '@shopify/polaris';

import {EmptyStateTravelBooking} from 'assets';

export function FuturePlans() {
  return (
    <Page title="Future Plans">
      <EmptyState
        heading="Soon ...hand tight"
        image={EmptyStateTravelBooking}
      />
    </Page>
  );
}
