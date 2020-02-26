import {useContext} from 'react';

import {AppContext} from 'components';

export function useAppContext() {
  return useContext(AppContext);
}
