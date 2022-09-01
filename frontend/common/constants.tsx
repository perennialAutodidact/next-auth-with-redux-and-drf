import {GiPlantSeed, GiWoodPile, GiFruitTree, GiCarrot} from 'react-icons/gi'
import {BsWrench} from 'react-icons/bs'


export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION;


    export const ACCESS_TOKEN_LIFETIME = 60 * 30 * 1000
    export const REFRESH_TOKEN_LIFETIME = 60 * 60 * 24 * 1000


export const BARTER_TYPES = ["seed", "plant", "produce", "material", "tool"];

export const QUANTITY_UNITS = {
  NA: "",
  PL: "plant",
  BC: "bunch",
  CT: "count",
  PK: "package",
  OZ: "ounce",
  LB: "pound",
  CY: "cubic yard",
  GL: "gallon",
  PT: "pint"
};

export const BARTER_ICONS = {
    'seed': <GiPlantSeed/>,
    'plant': <GiFruitTree/>,
    'produce': <GiCarrot/>,
    'material': <GiWoodPile/>,
    'tool': <BsWrench/>
}