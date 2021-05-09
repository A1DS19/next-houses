/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindHouse
// ====================================================

export interface FindHouse_fetchHouse_nearby {
  __typename: "House";
  id: string;
  latitude: number;
  longitude: number;
}

export interface FindHouse_fetchHouse {
  __typename: "House";
  id: string;
  userId: string;
  publicId: string;
  address: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
  nearby: FindHouse_fetchHouse_nearby[] | null;
}

export interface FindHouse {
  fetchHouse: FindHouse_fetchHouse | null;
}

export interface FindHouseVariables {
  houseId: string;
}
