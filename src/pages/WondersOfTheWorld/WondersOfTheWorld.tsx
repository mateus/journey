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
    fields: {new7WondersOfTheWorld},
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
    },
    async onSubmit({new7WondersOfTheWorld}) {
      // console.log(new7WondersOfTheWorld);
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
          description="In 2001 an initiative was started by the Swiss corporation New7Wonders Foundation to choose the New7Wonders of the World from a selection of 200 existing monuments through online votes."
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
      </Layout>
    </Page>
  );
}
