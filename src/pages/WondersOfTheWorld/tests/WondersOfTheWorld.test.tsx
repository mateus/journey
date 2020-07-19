import React from 'react';
import {act} from 'react-dom/test-utils';
import {Page, ContextualSaveBar} from '@shopify/polaris';
import {useCollection} from 'react-firebase-hooks/firestore';

import {SkeletonAnnotated} from 'components';
import {mountWithAppProvider, updateWrapper} from 'tests/utilities';

import {WondersOfTheWorld} from '../WondersOfTheWorld';
import {WONDERS_OF_THE_WORLD} from '../wonders';
import {WondersCard} from '../components';
import {WondersFormValues} from '../hooks';

jest.mock('react-firebase-hooks/auth', () => ({
  ...require.requireActual('react-firebase-hooks/auth'),
  useAuthState: jest.fn(() => [{uid: 'fake-id'}, false, false]),
}));
jest.mock('react-firebase-hooks/firestore', () => ({
  ...require.requireActual('react-firebase-hooks/firestore'),
  useCollection: jest.fn(),
}));

const useCollectionSpy = useCollection as jest.Mock;

describe('<WondersOfTheWorld />', () => {
  const wondersInitialValues: WondersFormValues = {
    new7WondersOfTheWorld: {
      greatWallOfChina: false,
      petra: false,
      christTheRedeemer: false,
      machuPicchu: false,
      chichenItza: false,
      colosseum: false,
      tajMahal: false,
    },
    new7WondersOfNature: {
      tableMountain: false,
      iguazuFalls: false,
      komodoIsland: false,
      halongBay: false,
      puertoPrincesaUndergroundRiver: false,
      amazon: false,
      jejuIsland: false,
    },
  };

  beforeEach(() => {
    useCollectionSpy.mockReturnValue([
      createCollectionsSnapshot(wondersInitialValues),
      false,
      null,
    ]);
  });

  afterEach(() => {
    useCollectionSpy.mockRestore();
  });

  it('render <SkeletonAnnotated /> when collection is still loading', async () => {
    useCollectionSpy.mockReturnValue([null, true, null]);
    const wrapper = await mountWithAppProvider(<WondersOfTheWorld />);
    expect(wrapper.find(SkeletonAnnotated)).toExist();
  });

  it('renders <Page />', async () => {
    const wrapper = await mountWithAppProvider(<WondersOfTheWorld />);
    expect(wrapper.find(Page)).toHaveProp({title: 'Wonders of the World'});
  });

  it('renders <ContextualSaveBar /> when form is dirty', async () => {
    const wrapper = await mountWithAppProvider(<WondersOfTheWorld />);
    const wondersCard = wrapper.find(WondersCard).first();
    act(() => {
      wondersCard.prop('wondersFields').greatWallOfChina.onChange(true);
    });
    await updateWrapper(wrapper);
    expect(wrapper.find(ContextualSaveBar)).toHaveProp({
      message: 'Unsaved changes',
    });
  });

  describe('<WondersCard />', () => {
    it('renders a <WondersCard /> for each list', async () => {
      const wrapper = await mountWithAppProvider(<WondersOfTheWorld />);
      expect(wrapper.find(WondersCard)).toHaveLength(2);

      for (const [key, _] of Object.entries(wondersInitialValues)) {
        expect(
          wrapper
            .find(WondersCard)
            .filterWhere(
              (node) => node.prop('wonders') === WONDERS_OF_THE_WORLD[key],
            ),
        ).toHaveProp({
          wonders: WONDERS_OF_THE_WORLD[key],
        });
      }
    });

    it('renders with initial form values', async () => {
      const updatedWondersInitialValues: WondersFormValues = {
        new7WondersOfTheWorld: {
          greatWallOfChina: false,
          petra: false,
          christTheRedeemer: true,
          machuPicchu: true,
          chichenItza: true,
          colosseum: false,
          tajMahal: false,
        },
        new7WondersOfNature: {
          tableMountain: false,
          iguazuFalls: false,
          komodoIsland: false,
          halongBay: false,
          puertoPrincesaUndergroundRiver: false,
          amazon: false,
          jejuIsland: false,
        },
      };
      useCollectionSpy.mockReturnValue([
        createCollectionsSnapshot(updatedWondersInitialValues),
        false,
        null,
      ]);
      const wrapper = await mountWithAppProvider(<WondersOfTheWorld />);
      expect(
        wrapper
          .find(WondersCard)
          .filterWhere(
            (node) =>
              node.prop('wonders') ===
              WONDERS_OF_THE_WORLD.new7WondersOfTheWorld,
          ),
      ).toHaveProp({
        wondersFields: {
          greatWallOfChina: expect.objectContaining({value: false}),
          petra: expect.objectContaining({value: false}),
          christTheRedeemer: expect.objectContaining({value: true}),
          machuPicchu: expect.objectContaining({value: true}),
          chichenItza: expect.objectContaining({value: true}),
          colosseum: expect.objectContaining({value: false}),
          tajMahal: expect.objectContaining({value: false}),
        },
      });
    });
  });
});

// Mimics Firestore data snapshots
function createCollectionsSnapshot(wondersInitialValues: WondersFormValues) {
  const docs = [
    {
      id: 'new7WondersOfTheWorld',
      data: () => wondersInitialValues.new7WondersOfTheWorld,
    },
    {
      id: 'new7WondersOfNature',
      data: () => wondersInitialValues.new7WondersOfNature,
    },
  ];
  return {docs};
}
