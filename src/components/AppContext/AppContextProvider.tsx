import React, {ReactNode} from 'react';

import {AppContextProps, AppContext, defaultAppContext} from './context';

export function AppContextProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: AppContextProps;
}): JSX.Element {
  return (
    <AppContext.Provider value={data || defaultAppContext}>
      {children}
    </AppContext.Provider>
  );
}
