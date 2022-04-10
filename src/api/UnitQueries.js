import { gql } from "@apollo/client";

export const UNITS = gql`
  query Units {
    units {
      _id
      name
      company {
        _id
        name
      }
    }
  }
`;

export const DELETE_UNIT = gql`
  mutation DeleteUnit($_id: ID!) {
    deleteUnit(_id: $_id)
  }
`;

export const queryGetUnits = `{
    units {
    _id
    name
    company {
        _id
        name
    }
    }
}`;

export const ADD_UNIT = gql`
  mutation CreateUnit($name: String!, $company: ID!) {
    createUnit(name: $name, company: $company) {
      _id
      name
      company {
        _id
        name
      }
    }
  }
`;

export const EDIT_UNIT = gql`
  mutation EditUnit($_id: ID!, $name: String, $company: ID) {
    editUnit(UnitInput: { _id: $_id, name: $name, company: $company }) {
      _id
      name
      company {
        _id
        name
      }
    }
  }
`;
