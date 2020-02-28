import 'jest-enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {mocksdk} from './firebaseMocks';

configure({adapter: new Adapter()});

jest.mock('firebase/app', () => {
  return {
    ...mocksdk,
    analytics: jest.fn(),
  };
});
