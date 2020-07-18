import React from 'react';
import {Checkbox, Card, Image, DisplayText, TextStyle} from '@shopify/polaris';

import {mountWithAppProvider} from 'tests/utilities';
import {mockField} from 'utilities/form';

import {WondersCard, WondersCardProps} from '../WondersCard';
import {WONDERS_OF_THE_WORLD} from '../../../wonders';

describe('<WondersCard />', () => {
  const wonders = WONDERS_OF_THE_WORLD.new7WondersOfTheWorld;
  const mockProps: WondersCardProps = {
    wondersFields: {
      greatWallOfChina: mockField(false),
      petra: mockField(false),
      christTheRedeemer: mockField(true),
      machuPicchu: mockField(true),
      chichenItza: mockField(true),
      colosseum: mockField(false),
      tajMahal: mockField(false),
    },
    wonders,
  };

  it('renders a Card', async () => {
    const wrapper = await mountWithAppProvider(<WondersCard {...mockProps} />);
    expect(wrapper.find(Card)).toHaveProp({sectioned: true});
  });

  it('renders a Checkbox for each field', async () => {
    const wrapper = await mountWithAppProvider(<WondersCard {...mockProps} />);

    Object.entries(mockProps.wonders).forEach(([key, {name}]) => {
      const checkbox = wrapper
        .find(Checkbox)
        .filterWhere((node) => node.prop('label') === name);
      expect(checkbox).toHaveProp({
        checked: mockProps.wondersFields[key].value,
        onChange: mockProps.wondersFields[key].onChange,
      });
    });
  });

  it('renders a Image for each field', async () => {
    const wrapper = await mountWithAppProvider(<WondersCard {...mockProps} />);

    Object.values(mockProps.wonders).forEach(({name, image}) => {
      const imageComponent = wrapper
        .find(Image)
        .filterWhere((node) => node.prop('alt') === name);
      expect(imageComponent).toHaveProp({
        source: image,
      });
    });
  });

  it('renders a item copy for each field', async () => {
    const wrapper = await mountWithAppProvider(<WondersCard {...mockProps} />);

    Object.values(mockProps.wonders).forEach(({name, city, country}) => {
      const wonderName = wrapper
        .find(DisplayText)
        .filterWhere((node) => node.text() === name);
      const wonderLocation = wrapper
        .find(TextStyle)
        .filterWhere((node) => node.text() === `${city}, ${country}`);
      expect(wonderName).toExist();
      expect(wonderLocation).toExist();
    });
  });
});
