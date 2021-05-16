/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditHouse
// ====================================================

export interface EditHouse_fetchHouse {
  __typename: "House";
  id: string;
  userId: string;
  address: string;
  publicId: string;
  image: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
}

export interface EditHouse {
  fetchHouse: EditHouse_fetchHouse | null;
}

export interface EditHouseVariables {
  houseId: string;
}
