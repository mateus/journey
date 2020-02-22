import React from 'react';
import {shallow} from 'enzyme';
import {useAuthState} from 'react-firebase-hooks/auth';
import {User} from 'firebase';
import {Avatar, DisplayText} from '@shopify/polaris';

import {logo192} from 'assets/images';

import {TopNav} from '../TopNav';

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(),
}));
const useAuthStateSpy = useAuthState as jest.Mock;

describe('<TopNav />', () => {
  const mockName = 'Mateus F.';
  beforeEach(() => {
    useAuthStateSpy.mockReturnValue([
      {displayName: mockName, photoURL: logo192} as User,
      false,
      null,
    ]);
  });

  afterEach(() => {
    useAuthStateSpy.mockRestore();
  });

  it('renders Image with logo', () => {
    const wrapper = shallow(<TopNav />);
    expect(
      wrapper.containsMatchingElement(
        <Avatar name={mockName} customer size="large" source={logo192} />,
      ),
    ).toBeTruthy();
  });

  it('renders user name', () => {
    const wrapper = shallow(<TopNav />);
    expect(
      wrapper.containsMatchingElement(
        <DisplayText size="small">{mockName}</DisplayText>,
      ),
    ).toBeTruthy();
  });
});
