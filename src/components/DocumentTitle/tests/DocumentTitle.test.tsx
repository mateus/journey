import React from 'react';
import {mount} from 'enzyme';

import {
  DocumentTitle,
  DEFAULT_SOURCE,
  createDocumentTitle,
} from '../DocumentTitle';

describe('<DocumentTitle />', () => {
  it('renders and sets document title', () => {
    const newTitle = 'New page title';
    mount(<DocumentTitle title={newTitle} />);
    expect(document.title).toEqual(createDocumentTitle(newTitle));
  });
});

describe('createDocumentTitle()', () => {
  it('returns string with default source and title', () => {
    const title = 'My page title';
    expect(createDocumentTitle(title)).toEqual(`${DEFAULT_SOURCE} - ${title}`);
  });

  it('returns string with custom source and title', () => {
    const title = 'My page title';
    const source = 'Another Source';
    expect(createDocumentTitle(title, source)).toEqual(`${source} - ${title}`);
  });
});
