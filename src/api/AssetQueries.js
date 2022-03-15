export const queryGetAssets = `{
  assets {
    _id
    name
    image
    description
    model
    owner
    status
    health_level
    unit {
      _id
      name
    }
  }
}`;

export const queryDeleteAsset = (_id) => `mutation {
  deleteAsset(_id: "${_id}")
}`;

export const queryAddAsset = (inputData) => `mutation {
        createAsset(AssetInput:{name: "${inputData.name}", image: "${inputData.image}", description: "${inputData.description}", model: "${inputData.model}", owner: "${inputData.owner}", status: ${inputData.status}, health_level: ${inputData.health_level}, unit: "${inputData.unit}"}) {
          _id
          }
      }`;

export const queryEditAsset = (inputData) => `mutation {
  editAsset(_id: "${inputData._id}", AssetInput: {name: "${inputData.name}", image: "${inputData.image}", description: "${inputData.description}", model: "${inputData.model}", owner: "${inputData.owner}", status: ${inputData.status}, health_level: ${inputData.health_level}, unit: "${inputData.unit}"}) {
      _id
  }
}`;
