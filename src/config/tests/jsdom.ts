import {JSDOM} from 'jsdom';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      document: Document;
    }
  }
}

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {window} = jsdom;

global.document = window.document;
