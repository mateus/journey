import 'jest-enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {JSDOM} from 'jsdom';

import {mocksdk} from './firebaseMocks';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      document: Document;
    }
  }
}

jest.mock('firebase/app', () => {
  return {
    ...mocksdk,
    analytics: jest.fn(),
  };
});

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {window} = jsdom;

global.document = window.document;

configure({adapter: new Adapter()});
