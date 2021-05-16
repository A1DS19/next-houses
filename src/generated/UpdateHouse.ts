/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HouseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateHouse
// ====================================================

export interface UpdateHouse_updateHouse {
  __typename: "House";
  id: string;
  userId: string;
  image: string;
  publicId: string;
  address: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
}

export interface UpdateHouse {
  updateHouse: UpdateHouse_updateHouse | null;
}

export interface UpdateHouseVariables {
  id: string;
  input: HouseInput;
}
