import React from 'react';
import {ContextualSaveBar, Layout, Page} from '@shopify/polaris';
import {
  useForm,
  useField,
  submitFail,
  submitSuccess,
} from '@shopify/react-form';
import moment from 'moment';

import {useToast} from 'hooks/useToast';
import {DocumentTitle, SkeletonAnnotated} from 'components';

import {WondersCard} from './components';
import {WONDERS_OF_THE_WORLD} from './wonders';
import {useWonders} from './hooks';

export function WondersOfTheWorld() {
  const {wonders, wondersCollectionRef, loading, error} = useWonders();
  const [Toast, showToast] = useToast();
  const {new7WondersOfTheWorld, new7WondersOfNature} = wonders;

  const {fields, submit, submitting, dirty, reset} = useForm({
    fields: {
      new7WondersOfTheWorld: {
        greatWallOfChina: useField(new7WondersOfTheWorld.greatWallOfChina),
        petra: useField(new7WondersOfTheWorld.petra),
        christTheRedeemer: useField(new7WondersOfTheWorld.christTheRedeemer),
        machuPicchu: useField(new7WondersOfTheWorld.machuPicchu),
        chichenItza: useField(new7WondersOfTheWorld.chichenItza),
        colosseum: useField(new7WondersOfTheWorld.colosseum),
        tajMahal: useField(new7WondersOfTheWorld.tajMahal),
      },
      new7WondersOfNature: {
        tableMountain: useField(new7WondersOfNature.tableMountain),
        iguazuFalls: useField(new7WondersOfNature.iguazuFalls),
        komodoIsland: useField(new7WondersOfNature.komodoIsland),
        halongBay: useField(new7WondersOfNature.halongBay),
        puertoPrincesaUndergroundRiver: useField(
          new7WondersOfNature.puertoPrincesaUndergroundRiver,
        ),
        amazon: useField(new7WondersOfNature.amazon),
        jejuIsland: useField(new7WondersOfNature.jejuIsland),
      },
    },
    async onSubmit({new7WondersOfTheWorld, new7WondersOfNature}) {
      try {
        if (wondersCollectionRef) {
          await wondersCollectionRef.doc('new7WondersOfTheWorld').update({
            ...new7WondersOfTheWorld,
            updatedAt: moment().toDate(),
          });
          await wondersCollectionRef.doc('new7WondersOfNature').update({
            ...new7WondersOfNature,
            updatedAt: moment().toDate(),
          });
          showToast({content: 'Wonders of the World updated'});

          return submitSuccess();
        }
        return submitFail();
      } catch (err) {
        return submitFail();
      }
    },
  });

  if (error) throw new Error(error.message);
  if (loading) return <SkeletonAnnotated />;

  return (
    <Page title="Wonders of the World" separator>
      <DocumentTitle title="Wonders of the World" />
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
          <WondersCard
            wonders={WONDERS_OF_THE_WORLD.new7WondersOfTheWorld}
            wondersFields={fields.new7WondersOfTheWorld}
          />
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="New 7 Wonders of Nature"
          description="A contemporary effort to create a list of seven natural wonders chosen through a global poll, was organized by the same group as the New7Wonders of the World campaign."
        >
          <WondersCard
            wonders={WONDERS_OF_THE_WORLD.new7WondersOfNature}
            wondersFields={fields.new7WondersOfNature}
          />
        </Layout.AnnotatedSection>
      </Layout>
      <Toast />
    </Page>
  );
}
