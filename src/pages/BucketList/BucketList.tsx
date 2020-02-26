import React from 'react';
import {EmptyState, Page} from '@shopify/polaris';

import {EmptyStateBucketList} from 'assets';

export function BucketList() {
  return (
    <Page title="Bucket List">
      <EmptyState heading="Soon ...hand tight" image={EmptyStateBucketList} />
    </Page>
  );
}
