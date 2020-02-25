import React from 'react';
import {Spinner} from '@shopify/polaris';

import './Loading.scss';

export function LoadingPage() {
  return (
    <div className="Loading">
      <Spinner accessibilityLabel="Loading" size="large" color="teal" />
    </div>
  );
}
