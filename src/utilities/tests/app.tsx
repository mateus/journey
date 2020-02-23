import React from 'react';
import {act} from 'react-dom/test-utils';
import {MemoryRouter} from 'react-router-dom';
import {ReactWrapper} from 'enzyme';
import {PolarisTestProvider} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';

export async function mountWithAppProvider(children: React.ReactElement) {
  const node = (
    <MemoryRouter>
      <PolarisTestProvider theme={{}} i18n={en}>
        {children}
      </PolarisTestProvider>
    </MemoryRouter>
  );
  const wrapper = new ReactWrapper(node);
  await actWait();
  return wrapper;
}

export function wait(amount = 0) {
  return new Promise((resolve) => setTimeout(resolve, amount));
}

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper
export async function actWait(amount = 0) {
  await act(async () => {
    await wait(amount);
  });
}

// Use this in your test after mounting if you want the query to finish and update the wrapper
export async function updateWrapper(wrapper: ReactWrapper, amount = 0) {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
}
