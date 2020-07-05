import React from 'react';
import {
  Checkbox,
  Card,
  ContextualSaveBar,
  Layout,
  Image,
  DisplayText,
  TextStyle,
  Stack,
  Page,
} from '@shopify/polaris';
import {
  useForm,
  useField,
  submitFail,
  submitSuccess,
} from '@shopify/react-form';

import {DocumentTitle} from 'components';

import {WONDERS_OF_THE_WORLD} from './wonders';
import './WondersOfTheWorld.scss';

export function WondersOfTheWorld() {
  const {
    fields: {new7WondersOfTheWorld, new7WondersOfNature},
    submit,
    submitting,
    dirty,
    reset,
    // submitErrors,
  } = useForm({
    fields: {
      new7WondersOfTheWorld: {
        greatWallOfChina: useField(false),
        petra: useField(false),
        christTheRedeemer: useField(false),
        machuPicchu: useField(false),
        chichenItza: useField(false),
        colosseum: useField(false),
        tajMahal: useField(false),
      },
      new7WondersOfNature: {
        tableMountain: useField(false),
        iguazuFalls: useField(false),
        komodoIsland: useField(false),
        halongBay: useField(false),
        puertoPrincesaUndergroundRiver: useField(false),
        amazon: useField(false),
        jejuIsland: useField(false),
      },
    },
    async onSubmit({new7WondersOfTheWorld, new7WondersOfNature}) {
      // console.log(new7WondersOfTheWorld, new7WondersOfNature);
      try {
        return submitSuccess();
      } catch (error) {
        return submitFail();
      }
    },
  });

  return (
    <Page title="Wonder of the World" separator>
      <DocumentTitle title="Wonder of the World" />
      {dirty && (
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            onAction: submit,
            loading: submitting,
            disabled: submitting,
          }}
          discardAction={{
            onAction: reset,
          }}
        />
      )}
      <Layout>
        <Layout.AnnotatedSection
          title="New 7 Wonders of the World"
          description="New7Wonders of the World (2000–2007) was a campaign started in 2000 to choose Wonders of the World from a selection of 200 existing monuments."
        >
          <Card sectioned>
            <Stack vertical spacing="tight">
              {Object.entries(new7WondersOfTheWorld).map(([key, field]) => {
                const {
                  name,
                  city,
                  country,
                  image,
                } = WONDERS_OF_THE_WORLD.new7WondersOfTheWorld[key];

                return (
                  <div
                    className="WonderCheckboxWrapper"
                    key={name}
                    onClick={() => field.onChange(!field.value)}
                    onKeyDown={() => {}}
                  >
                    <div className="WonderRowButton__Content">
                      <Checkbox
                        key={name}
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
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="New 7 Wonders of Nature"
          description="A contemporary effort to create a list of seven natural wonders chosen through a global poll, was organized by the same group as the New7Wonders of the World campaign."
        >
          <Card sectioned>
            <Stack vertical spacing="tight">
              {Object.entries(new7WondersOfNature).map(([key, field]) => {
                const {
                  name,
                  city,
                  country,
                  image,
                } = WONDERS_OF_THE_WORLD.new7WondersOfNature[key];

                return (
                  <div
                    className="WonderCheckboxWrapper"
                    key={name}
                    onClick={() => field.onChange(!field.value)}
                    onKeyDown={() => {}}
                  >
                    <div className="WonderRowButton__Content">
                      <Checkbox
                        key={name}
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
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
