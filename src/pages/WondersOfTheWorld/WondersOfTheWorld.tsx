import React from 'react';
import {Checkbox, ContextualSaveBar, Stack, Page} from '@shopify/polaris';
import {useForm, useField} from '@shopify/react-form';

import {DocumentTitle, LoadingPage} from 'components';

import {WONDERS_OF_THE_WORLD} from './wonders';

export function WondersOfTheWorld() {
  const {
    fields: {new7WondersOfTheWorld},
    submit,
    submitting,
    dirty,
    reset,
    submitErrors,
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
      console.log(new7WondersOfTheWorld);
      try {
        return {status: 'success'};
      } catch (error) {
        return {status: 'fail', errors: [{message: error.message}]};
      }
    },
  });

  return (
    <Page title="Wonder of the World">
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
      <Stack vertical>
        {Object.entries(new7WondersOfTheWorld).map(([key, field]) => {
          const label = WONDERS_OF_THE_WORLD.new7WondersOfTheWorld[key].name;
          return (
            <Checkbox
              key={label}
              label={label}
              checked={field.value}
              onChange={field.onChange}
            />
          );
        })}
      </Stack>
    </Page>
  );
}
