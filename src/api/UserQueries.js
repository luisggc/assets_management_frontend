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

/*   handleData: (data) => {
      return data.map((d) => ({
        ...d,
        company_name: d.company.name,
      }));
    },
  }; */

export const queryDeleteUser = (_id) => `mutation {
  deleteUser(_id: "${_id}") {
    _id
  }
}`;

export const queryAddUser = (inputData) => `mutation {
        createUser(name: "${inputData.name}", company: "${inputData.company}") {
          name
          }
      }`;

export const queryEditUser = (data) => `mutation {
  editUser(UserInput: {_id: "${data._id}", name: "${data.name}", company: "${data.company}"}){
      name
  }
}`;
