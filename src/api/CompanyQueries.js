export const queryGetCompanies = `{
    companies {
    name
    _id
    }
}`;

export const queryDeleteCompany = (_id) => `mutation {
  deleteCompany(_id: "${_id}")
}`;

export const queryAddCompany = (inputData) => `mutation {
  createCompany(name: "${inputData.name}") {
    name
    }
}`;

export const queryEditCompany = (data) => `mutation {
  editCompany(CompanyInput: {_id: "${data._id}", name: "${data.name}"}){
      name
  }
}`;
