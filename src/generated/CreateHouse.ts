/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HouseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateHouse
// ====================================================

export interface CreateHouse_createHouse {
  __typename: "House";
  id: string;
}

export interface CreateHouse {
  createHouse: CreateHouse_createHouse | null;
}

export interface CreateHouseVariables {
  input: HouseInput;
}
