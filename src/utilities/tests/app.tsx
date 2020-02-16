import React from 'react';
import {mount} from 'enzyme';
import {PolarisTestProvider} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';

export function mountWithPolarisProvider(children: React.ReactElement) {
  return mount(<PolarisTestProvider i18n={en}>{children}</PolarisTestProvider>);
}
