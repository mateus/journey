import {createContext} from 'react';
import {User} from 'firebase';

export interface AppContextProps {
  app: {
    user?: User;
  };
}

export const defaultAppContext: AppContextProps = {
  app: {
    user: undefined,
  },
};

export const AppContext = createContext(defaultAppContext);
