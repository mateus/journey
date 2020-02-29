import 'jest-enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {mocksdk} from 'config/tests/firebaseMocks';

jest.mock('firebase/app', () => {
  return {
    ...mocksdk,
    analytics: jest.fn(),
  };
});

configure({adapter: new Adapter()});
