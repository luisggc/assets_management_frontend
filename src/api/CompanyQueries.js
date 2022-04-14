import { gql } from "@apollo/client";

export const queryGetCompanies = `{
    companies {
    name
    _id
    }
}`;

export const COMPANIES = gql`
  query Companies {
    companies {
      name
      _id
    }
  }
`;

export const ADD_COMPANY = gql`
  mutation CreateCompany($name: String!) {
    createCompany(name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($_id: ID!) {
    deleteCompany(_id: $_id) {
      _id
    }
  }
`;

export const EDIT_COMPANY = gql`
  mutation EditCompany($_id: ID!, $name: String!) {
    editCompany(CompanyInput: { _id: $_id, name: $name }) {
      _id
      name
    }
  }
`;
