import React from 'react';
import {
  Checkbox,
  Card,
  Image,
  DisplayText,
  TextStyle,
  Stack,
} from '@shopify/polaris';
import {Field} from '@shopify/react-form';

import {Wonders} from '../../wonders';
import './WondersCard.scss';

export interface WondersCardProps {
  wondersFields: Record<string, Field<boolean>>;
  wonders: Wonders;
}

export function WondersCard({wonders, wondersFields}: WondersCardProps) {
  return (
    <Card sectioned>
      <Stack vertical spacing="tight">
        {Object.entries(wondersFields).map(([key, field]) => {
          const {name, city, country, image} = wonders[key];

          return (
            <div
              key={key}
              className="WonderCheckboxWrapper"
              onClick={() => field.onChange(!field.value)}
              onKeyDown={() => {}}
            >
              <div className="WonderRowButton__Content">
                <Checkbox
                  label={name}
                  labelHidden
                  checked={field.value}
                  onChange={field.onChange}
                />
                <Image
                  source={image}
                  alt={name}
                  width={150}
                  style={{filter: `grayscale(${field.value ? 0 : 100}%)`}}
                />
                <Stack vertical spacing="none">
                  <DisplayText size="small" element="h3">
                    {name}
                  </DisplayText>
                  <p>
                    <TextStyle variation="subdued">{`${city}, ${country}`}</TextStyle>
                  </p>
                </Stack>
              </div>
            </div>
          );
        })}
      </Stack>
    </Card>
  );
}
