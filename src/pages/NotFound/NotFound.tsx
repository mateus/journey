import React from 'react';
import {EmptyState} from '@shopify/polaris';

import {EmptyStateNotFound} from 'assets';

export function NotFound() {
  return (
    <EmptyState heading="Page not found" image={EmptyStateNotFound}>
      <p>Nothing here.</p>
    </EmptyState>
  );
}
