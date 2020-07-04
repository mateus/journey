export interface Wonder {
  name: string;
  city: string;
  country: string;
}

export type WondersRecord = Record<string, Wonder>;
export type WondersList = Record<string, WondersRecord>;

// Various lists of the Wonders of the World have been compiled from antiquity to the present day,
// to catalogue the world's most spectacular natural wonders and manmade structures.
export const WONDERS_OF_THE_WORLD: WondersList = {
  new7WondersOfTheWorld: {
    greatWallOfChina: {
      name: 'Great Wall of Chine',
      city: 'Beijing',
      country: 'China',
    },
    petra: {name: 'Petra', city: 'Petra', country: 'Jordania'},
    christTheRedeemer: {
      name: 'Christ the Redeemer',
      city: 'Rio de Janeiro',
      country: 'Brazil',
    },
    machuPicchu: {name: 'Machu Picchu', city: 'Cuzco', country: 'Peru'},
    chichenItza: {name: 'Chichen Itza', city: 'Valladolid', country: 'Mexico'},
    colosseum: {name: 'Colosseum', city: 'Roma', country: 'Italy'},
    tajMahal: {name: 'Taj Mahal', city: 'Agra', country: 'India'},
  },
};
