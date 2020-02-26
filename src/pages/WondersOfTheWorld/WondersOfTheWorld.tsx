import React from 'react';
import {EmptyState, Page} from '@shopify/polaris';

import {EmptyStateConnectedWorld} from 'assets';

export function WondersOfTheWorld() {
  return (
    <Page title="Wonder of the World">
      <EmptyState
        heading="Soon ...hand tight"
        image={EmptyStateConnectedWorld}
      />
    </Page>
  );
}
