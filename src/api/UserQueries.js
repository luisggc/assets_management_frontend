import { gql } from "@apollo/client";

export const USERS = gql`
  query Users {
    users {
      _id
      name
      company {
          _id
          name
      }
      }
  }
`;

export const queryGetUsers = `{
    users {
    _id
    name
    company {
        _id
        name
    }
    }
}`;

export const DELETE_USER = gql`
  mutation DeleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;

export const queryDeleteUser = (_id) => `mutation {
  deleteUser(_id: "${_id}") {
    _id
  }
}`;

export const ADD_USER = gql`
  mutation CreateUser($name: String!, $company: ID!) {
    createUser(name: $name, company: $company) {
      _id
      name
      company {
        _id
        name
      }
    }
  }
`;

export const queryAddUser = (inputData) => `mutation {
        createUser(name: "${inputData.name}", company: "${inputData.company}") {
          name
          }
      }`;


export const EDIT_USER = gql`
  mutation EditUser($name: String!, $company: ID!) {
    editUser(UserInput: {name: $name, company: $company}) {
      _id
      name
      company {
        _id
        name
      }
    }
  }
`;

export const queryEditUser = (data) => `mutation {
  editUser(UserInput: {_id: "${data._id}", name: "${data.name}", company: "${data.company}"}){
      name
  }
}`;
