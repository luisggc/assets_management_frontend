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

/*   handleData: (data) => {
      return data.map((d) => ({
        ...d,
        company_name: d.company.name,
      }));
    },
  }; */

export const queryDeleteUnit = (_id) => `mutation {
  deleteUnit(_id: "${_id}")
}`;

export const queryAddUnit = (inputData) => `mutation {
        createUnit(name: "${inputData.name}", company: "${inputData.company}") {
          name
          }
      }`;

export const queryEditUnit = (data) => `mutation {
  editUnit(UnitInput: {_id: "${data._id}", name: "${data.name}", company: "${data.company}"}){
      name
  }
}`;
