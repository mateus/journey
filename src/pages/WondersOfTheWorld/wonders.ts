import {
  ChristTheRedeemer,
  Colosseum,
  ChichenItza,
  GreatWallOfChina,
  Petra,
  MachuPicchu,
  TajMahal,
  AmazonRiver,
  HalongBay,
  IguazuFalls,
  JejuIsland,
  KomodoIsland,
  PuertoPrincesa,
  TableMountain,
} from './assets';

export interface WonderItem {
  name: string;
  city: string;
  country: string;
  image: string;
}

export type Wonders = Record<string, WonderItem>;
export type AllWondersLists = Record<string, Wonders>;

const new7WondersOfTheWorld: Wonders = {
  greatWallOfChina: {
    name: 'Great Wall of China',
    city: 'Beijing',
    country: 'China',
    image: GreatWallOfChina,
  },
  petra: {name: 'Petra', city: 'Petra', country: 'Jordania', image: Petra},
  christTheRedeemer: {
    name: 'Christ the Redeemer',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    image: ChristTheRedeemer,
  },
  machuPicchu: {
    name: 'Machu Picchu',
    city: 'Cuzco',
    country: 'Peru',
    image: MachuPicchu,
  },
  chichenItza: {
    name: 'Chichen Itza',
    city: 'Valladolid',
    country: 'Mexico',
    image: ChichenItza,
  },
  colosseum: {
    name: 'Colosseum',
    city: 'Roma',
    country: 'Italy',
    image: Colosseum,
  },
  tajMahal: {
    name: 'Taj Mahal',
    city: 'Agra',
    country: 'India',
    image: TajMahal,
  },
};

const new7WondersOfNature: Wonders = {
  tableMountain: {
    name: 'Table Mountain',
    city: 'Cape Town',
    country: 'South Africa',
    image: TableMountain,
  },
  iguazuFalls: {
    name: 'Iguazu Falls',
    city: 'Iguazu River',
    country: 'Brazil and Argentina',
    image: IguazuFalls,
  },
  komodoIsland: {
    name: 'Komodo Island',
    city: 'Island',
    country: 'Indonesia',
    image: KomodoIsland,
  },
  halongBay: {
    name: 'Halong Bay',
    city: 'Bay',
    country: 'Vietnam',
    image: HalongBay,
  },
  puertoPrincesaUndergroundRiver: {
    name: 'Puerto Princesa Underground River',
    city: 'Puerto Princesa',
    country: 'Philippines',
    image: PuertoPrincesa,
  },
  amazon: {
    name: 'Amazon River',
    city: 'Amazon',
    country: 'Brazil',
    image: AmazonRiver,
  },
  jejuIsland: {
    name: 'Jeju Island',
    city: 'Island',
    country: 'South Korea',
    image: JejuIsland,
  },
};

// Various lists of the Wonders of the World have been compiled from antiquity to the present day
// to catalogue the world's most spectacular natural wonders and manmade structures.
export const WONDERS_OF_THE_WORLD: AllWondersLists = {
  new7WondersOfTheWorld,
  new7WondersOfNature,
};
