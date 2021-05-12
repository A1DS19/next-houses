/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BoundsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: houses
// ====================================================

export interface houses_fetchHouses {
  __typename: "House";
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  publicId: string;
  bedrooms: number;
}

export interface houses {
  fetchHouses: houses_fetchHouses[] | null;
}

export interface housesVariables {
  bounds: BoundsInput;
}
